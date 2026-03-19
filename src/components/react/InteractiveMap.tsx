import "leaflet/dist/leaflet.css";
import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

interface MapMarker {
  lat: number;
  lng: number;
  title: string;
  link?: string;
}

interface InteractiveMapProps {
  markers: MapMarker[];
  center?: { lat: number; lng: number };
  zoom?: number;
}

const GOLD_MARKER_SVG = encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 36" fill="none">
  <path d="M12 0C5.373 0 0 5.373 0 12c0 9 12 24 12 24s12-15 12-24C24 5.373 18.627 0 12 0z" fill="#d97706"/>
  <circle cx="12" cy="11" r="5" fill="#fff"/>
</svg>
`);

const goldIcon = L.icon({
  iconUrl: `data:image/svg+xml,${GOLD_MARKER_SVG}`,
  iconSize: [28, 42],
  iconAnchor: [14, 42],
  popupAnchor: [0, -42],
});

export default function InteractiveMap({
  markers,
  center,
  zoom = 7,
}: InteractiveMapProps) {
  const mapCenter = center ?? { lat: 27.1751, lng: 78.0421 };

  useEffect(() => {
    // Fix for default Leaflet marker icon issue in bundlers
    delete (L.Icon.Default.prototype as unknown as Record<string, unknown>)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: undefined,
      iconUrl: `data:image/svg+xml,${GOLD_MARKER_SVG}`,
      shadowUrl: undefined,
    });
  }, []);

  return (
    <div className="overflow-hidden rounded-xl border border-stone-200 dark:border-stone-700">
      <MapContainer
        center={[mapCenter.lat, mapCenter.lng]}
        zoom={zoom}
        scrollWheelZoom={false}
        className="z-0 h-[300px] w-full sm:h-[400px] lg:h-[500px]"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {markers.map((marker, index) => (
          <Marker
            key={index}
            position={[marker.lat, marker.lng]}
            icon={goldIcon}
          >
            <Popup>
              <div className="text-center">
                <strong className="text-stone-900">{marker.title}</strong>
                {marker.link && (
                  <div className="mt-1">
                    <a
                      href={marker.link}
                      className="text-sm text-amber-600 underline hover:text-amber-700"
                    >
                      Learn more
                    </a>
                  </div>
                )}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
