import React, { useEffect, useRef, useState } from 'react';
import { Calendar, Check, Crosshair, Loader2, LocateFixed, MapPin, Navigation, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { memoryosApi } from '../../services/apiClient';
import { loadGoogleMaps } from '../../services/googleMapsLoader';

const EMPTY_FORM = {
  title: '',
  content: '',
  memoryDate: '',
  locationName: '',
  latitude: null,
  longitude: null,
};

export default function MemoryEditorModal({ mode = 'create', memory, token, onClose, onSaved }) {
  const [form, setForm] = useState(() => memoryToForm(memory));
  const [saving, setSaving] = useState(false);
  const [geocoding, setGeocoding] = useState(false);
  const [locating, setLocating] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [mapStatus, setMapStatus] = useState('');
  const [mapLoading, setMapLoading] = useState(false);
  const [mapDraft, setMapDraft] = useState(null);
  const [error, setError] = useState('');
  const mapNodeRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markerRef = useRef(null);

  useEffect(() => {
    setForm(memoryToForm(memory));
    setMapDraft(null);
    setError('');
  }, [memory]);

  useEffect(() => {
    let cancelled = false;

    async function openMap() {
      if (!showMap || !token || !mapNodeRef.current) return;
      setMapLoading(true);
      setMapStatus('');

      try {
        const config = await memoryosApi.mapsConfig(token);
        if (!config.configured || !config.apiKey) {
          throw new Error('Google Maps is not configured for this workspace.');
        }

        const maps = await loadGoogleMaps(config.apiKey);
        if (cancelled || !mapNodeRef.current) return;

        const center = form.latitude != null && form.longitude != null
          ? { lat: Number(form.latitude), lng: Number(form.longitude) }
          : { lat: 20.5937, lng: 78.9629 };

        const map = new maps.Map(mapNodeRef.current, {
          center,
          zoom: form.latitude != null && form.longitude != null ? 13 : 4,
          clickableIcons: false,
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: false,
        });

        mapInstanceRef.current = map;
        if (form.latitude != null && form.longitude != null) {
          markerRef.current = new maps.Marker({ map, position: center });
          setMapDraft({
            latitude: Number(form.latitude),
            longitude: Number(form.longitude),
            locationName: form.locationName,
          });
        }

        map.addListener('click', async (event) => {
          const latitude = event.latLng.lat();
          const longitude = event.latLng.lng();
          if (markerRef.current) markerRef.current.setMap(null);
          markerRef.current = new maps.Marker({ map, position: { lat: latitude, lng: longitude } });
          setMapDraft({ latitude, longitude, locationName: '' });
          setMapStatus('Resolving selected point...');
          try {
            const resolved = await memoryosApi.reverseGeocode(token, latitude, longitude);
            if (!cancelled) {
              setMapDraft({
                latitude,
                longitude,
                locationName: resolved.locationName || coordinateLabel(latitude, longitude),
              });
              setMapStatus(resolved.resolved ? '' : resolved.message || 'Point selected.');
            }
          } catch (err) {
            if (!cancelled) {
              setMapDraft({ latitude, longitude, locationName: coordinateLabel(latitude, longitude) });
              setMapStatus(err.message || 'Point selected, but the address could not be resolved.');
            }
          }
        });
      } catch (err) {
        if (!cancelled) setMapStatus(err.message || 'Map could not be loaded.');
      } finally {
        if (!cancelled) setMapLoading(false);
      }
    }

    openMap();
    return () => {
      cancelled = true;
    };
  }, [showMap, token, form.latitude, form.longitude, form.locationName]);

  function updateField(name, value) {
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function resolveManualLocation() {
    if (!form.locationName.trim()) {
      setError('Enter a location before resolving it.');
      return null;
    }

    setGeocoding(true);
    setError('');
    try {
      const resolved = await memoryosApi.geocode(token, form.locationName.trim());
      if (resolved.resolved && resolved.latitude != null && resolved.longitude != null) {
        setForm((current) => ({
          ...current,
          latitude: resolved.latitude,
          longitude: resolved.longitude,
        }));
      }
      return resolved;
    } catch (err) {
      setError(err.message || 'Location could not be resolved.');
      return null;
    } finally {
      setGeocoding(false);
    }
  }

  async function useCurrentLocation() {
    if (!navigator.geolocation) {
      setError('Current location is not available in this browser.');
      return;
    }

    setLocating(true);
    setError('');
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        try {
          const resolved = await memoryosApi.reverseGeocode(token, latitude, longitude);
          setForm((current) => ({
            ...current,
            latitude,
            longitude,
            locationName: resolved.locationName || coordinateLabel(latitude, longitude),
          }));
        } catch (err) {
          setForm((current) => ({
            ...current,
            latitude,
            longitude,
            locationName: coordinateLabel(latitude, longitude),
          }));
          setError(err.message || 'Coordinates were captured, but the address could not be resolved.');
        } finally {
          setLocating(false);
        }
      },
      () => {
        setLocating(false);
        setError('Location permission was denied. You can enter a location manually or pick one on the map.');
      },
      { enableHighAccuracy: true, timeout: 12000, maximumAge: 60000 }
    );
  }

  function confirmMapLocation() {
    if (!mapDraft) {
      setMapStatus('Choose a point on the map first.');
      return;
    }
    setForm((current) => ({
      ...current,
      locationName: mapDraft.locationName || coordinateLabel(mapDraft.latitude, mapDraft.longitude),
      latitude: mapDraft.latitude,
      longitude: mapDraft.longitude,
    }));
    setShowMap(false);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (!form.title.trim()) {
      setError('Title is required.');
      return;
    }
    if (!form.content.trim()) {
      setError('Content is required.');
      return;
    }

    setSaving(true);
    setError('');

    let nextForm = { ...form };
    if (nextForm.locationName.trim() && (nextForm.latitude == null || nextForm.longitude == null)) {
      const resolved = await resolveManualLocation();
      if (resolved?.resolved && resolved.latitude != null && resolved.longitude != null) {
        nextForm = { ...nextForm, latitude: resolved.latitude, longitude: resolved.longitude };
      }
    }

    const payload = {
      title: nextForm.title.trim(),
      story: nextForm.content.trim(),
      description: nextForm.content.trim().slice(0, 500),
      memoryDate: nextForm.memoryDate || null,
      locationName: nextForm.locationName.trim() || null,
      latitude: nextForm.latitude,
      longitude: nextForm.longitude,
      visibility: 'PRIVATE',
      personIds: [],
    };

    try {
      const saved = mode === 'edit'
        ? await memoryosApi.updateMemory(token, memory.id, payload)
        : await memoryosApi.createMemory(token, payload);
      onSaved(saved);
    } catch (err) {
      setError(err.message || 'Memory could not be saved.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-heading/25 px-4 py-6 backdrop-blur-sm">
      <motion.form
        initial={{ opacity: 0, y: 18, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 18, scale: 0.98 }}
        onSubmit={handleSubmit}
        className="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-3xl border border-border bg-[#FEFCF8] p-5 shadow-journal sm:p-6"
      >
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-text-muted">
              {mode === 'edit' ? 'Edit memory' : 'New memory'}
            </p>
            <h2 className="mt-1 font-display text-2xl font-extrabold text-heading">
              {mode === 'edit' ? 'Update this memory' : 'Capture a memory'}
            </h2>
          </div>
          <button type="button" onClick={onClose} className="rounded-2xl p-2 text-text-muted hover:bg-background hover:text-heading" aria-label="Close">
            <X size={18} />
          </button>
        </div>

        {error && (
          <p className="mb-4 rounded-2xl border border-status-error/30 bg-status-error/8 px-4 py-3 text-sm text-status-error">
            {error}
          </p>
        )}

        <div className="grid gap-4">
          <label className="block">
            <span className="text-xs font-semibold uppercase tracking-widest text-text-muted">Title</span>
            <input
              value={form.title}
              onChange={(event) => updateField('title', event.target.value)}
              className="mt-2 w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm font-semibold text-heading outline-none transition focus:border-heading"
              placeholder="A title you will recognize later"
            />
          </label>

          <label className="block">
            <span className="text-xs font-semibold uppercase tracking-widest text-text-muted">Content</span>
            <textarea
              value={form.content}
              onChange={(event) => updateField('content', event.target.value)}
              rows={6}
              className="mt-2 w-full resize-none rounded-2xl border border-border bg-background px-4 py-3 text-sm leading-6 text-heading outline-none transition focus:border-heading"
              placeholder="Write what happened, what it felt like, and what you want to remember."
            />
          </label>

          <label className="block">
            <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-text-muted">
              <Calendar size={12} />
              Date
            </span>
            <input
              type="date"
              value={form.memoryDate}
              onChange={(event) => updateField('memoryDate', event.target.value)}
              className="mt-2 w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm font-medium text-heading outline-none transition focus:border-heading sm:max-w-xs"
            />
          </label>

          <section className="rounded-3xl border border-border bg-background p-4">
            <div className="mb-4 flex items-center gap-2">
              <MapPin size={16} className="text-primary-700" />
              <h3 className="font-display text-base font-bold text-heading">Location</h3>
            </div>

            <div className="grid gap-3 md:grid-cols-[1fr_auto]">
              <input
                value={form.locationName}
                onChange={(event) => updateField('locationName', event.target.value)}
                className="rounded-2xl border border-border bg-[#FEFCF8] px-4 py-3 text-sm text-heading outline-none transition focus:border-heading"
                placeholder="Enter location"
              />
              <button
                type="button"
                onClick={resolveManualLocation}
                disabled={geocoding}
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-border bg-[#FEFCF8] px-4 py-3 text-sm font-semibold text-heading shadow-soft transition hover:shadow-card disabled:cursor-not-allowed disabled:opacity-60"
              >
                {geocoding ? <Loader2 size={14} className="animate-spin" /> : <Navigation size={14} />}
                Resolve
              </button>
            </div>

            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              <button
                type="button"
                onClick={useCurrentLocation}
                disabled={locating}
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-border bg-[#FEFCF8] px-4 py-3 text-sm font-semibold text-heading shadow-soft transition hover:shadow-card disabled:cursor-not-allowed disabled:opacity-60"
              >
                {locating ? <Loader2 size={14} className="animate-spin" /> : <LocateFixed size={14} />}
                Use Current Location
              </button>
              <button
                type="button"
                onClick={() => setShowMap((open) => !open)}
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-border bg-[#FEFCF8] px-4 py-3 text-sm font-semibold text-heading shadow-soft transition hover:shadow-card"
              >
                <Crosshair size={14} />
                Pick on Map
              </button>
            </div>

            {showMap && (
              <div className="mt-4 rounded-2xl border border-border bg-[#FEFCF8] p-3">
                <div ref={mapNodeRef} className="h-72 w-full rounded-2xl bg-border/40" />
                <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-xs text-text-muted">
                    {mapLoading ? 'Loading map...' : mapDraft ? selectedLocationLabel(mapDraft) : mapStatus || 'Click a point on the map.'}
                  </p>
                  <button
                    type="button"
                    onClick={confirmMapLocation}
                    disabled={!mapDraft}
                    className="inline-flex items-center justify-center gap-2 rounded-2xl bg-heading px-4 py-2.5 text-sm font-semibold text-white shadow-soft transition hover:bg-heading/90 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <Check size={14} />
                    Confirm Location
                  </button>
                </div>
                {mapStatus && mapDraft && <p className="mt-2 text-xs text-text-muted">{mapStatus}</p>}
              </div>
            )}

            {(form.locationName || form.latitude != null || form.longitude != null) && (
              <div className="mt-4 rounded-2xl border border-border/80 bg-[#FEFCF8] px-4 py-3">
                <p className="text-xs font-semibold uppercase tracking-widest text-text-muted">Selected location</p>
                <p className="mt-1 text-sm font-semibold text-heading">{form.locationName || 'Coordinates selected'}</p>
                {form.latitude != null && form.longitude != null && (
                  <p className="mt-1 text-xs text-text-muted">{coordinateLabel(form.latitude, form.longitude)}</p>
                )}
              </div>
            )}
          </section>
        </div>

        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button type="button" onClick={onClose} className="rounded-2xl border border-border px-5 py-3 text-sm font-semibold text-heading transition hover:bg-background">
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-heading px-5 py-3 text-sm font-semibold text-white shadow-soft transition hover:bg-heading/90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving && <Loader2 size={14} className="animate-spin" />}
            {mode === 'edit' ? 'Save Changes' : 'Add Memory'}
          </button>
        </div>
      </motion.form>
    </div>
  );
}

function memoryToForm(memory) {
  if (!memory) return EMPTY_FORM;
  return {
    title: memory.title || '',
    content: memory.story || memory.description || '',
    memoryDate: memory.memoryDate || '',
    locationName: memory.locationName || '',
    latitude: memory.latitude ?? null,
    longitude: memory.longitude ?? null,
  };
}

function coordinateLabel(latitude, longitude) {
  return `${Number(latitude).toFixed(5)}, ${Number(longitude).toFixed(5)}`;
}

function selectedLocationLabel(location) {
  return `${location.locationName || 'Selected point'} (${coordinateLabel(location.latitude, location.longitude)})`;
}
