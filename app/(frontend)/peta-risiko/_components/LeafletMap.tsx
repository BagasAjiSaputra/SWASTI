"use client";

import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { TrendingUp, Calendar, MapPin } from 'lucide-react';

interface LeafletMapProps {
    provinces: any[];
    onProvinceClick: (prov: any) => void;
    selectedCommodity: string;
    activeProvince: any;
    isSidebarOpen: boolean;
}

// Fix Leaflet marker icon issue in Next.js
const DefaultIcon = L.icon({
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

// Custom circle marker to match the premium theme
const createCustomMarker = (color: string) => {
    return L.divIcon({
        className: 'custom-div-icon',
        html: `<div style="
      background-color: ${color}; 
      width: 14px; 
      height: 14px; 
      border-radius: 50%; 
      border: 3px solid white;
      box-shadow: 0 4px 10px rgba(0,0,0,0.15), 0 0 15px ${color}80;
      "></div>`,
        iconSize: [14, 14],
        iconAnchor: [7, 7],
        popupAnchor: [130, 0],
    });
};

const getCommodityColor = (commodity: string) => {
    const c = commodity.toLowerCase();
    if (c.includes('beras')) return 'bg-blue-50 text-blue-600 border-blue-100';
    if (c.includes('cabai')) return 'bg-red-50 text-red-600 border-red-100';
    if (c.includes('bawang')) return 'bg-purple-50 text-purple-600 border-purple-100';
    if (c.includes('daging')) return 'bg-amber-50 text-amber-600 border-amber-100';
    if (c.includes('telur')) return 'bg-orange-50 text-orange-600 border-orange-100';
    if (c.includes('minyak') || c.includes('gula')) return 'bg-yellow-50 text-yellow-600 border-yellow-100';
    if (c.includes('ikan')) return 'bg-cyan-50 text-cyan-600 border-cyan-100';
    return 'bg-emerald-50 text-emerald-600 border-emerald-100';
};

const MapController = ({ activeProvince, selectedCommodity, isSidebarOpen }: { activeProvince: any, selectedCommodity: string, isSidebarOpen: boolean }) => {
    const map = useMap();

    // Handle map resizing when sidebar toggles
    useEffect(() => {
        setTimeout(() => {
            map.invalidateSize({ animate: true });
        }, 300); // Match sidebar transition duration
    }, [isSidebarOpen, map]);

    useEffect(() => {
        if (activeProvince && activeProvince.coords) {
            // Wait for sidebar transition and map invalidation to complete
            const delay = isSidebarOpen ? 100 : 400; 
            
            setTimeout(() => {
                map.flyTo(activeProvince.coords, 8, { 
                    duration: 1.5,
                    easeLinearity: 0.25
                });
                
                // Wait for pan to finish before opening popup
                setTimeout(() => {
                    map.eachLayer((layer: any) => {
                        if (layer instanceof L.Marker) {
                            const markerPos = layer.getLatLng();
                            if (Math.abs(markerPos.lat - activeProvince.coords[0]) < 0.01 &&
                                Math.abs(markerPos.lng - activeProvince.coords[1]) < 0.01) {
                                layer.openPopup();
                            }
                        }
                    });
                }, 500);
            }, delay);
        }
    }, [activeProvince, selectedCommodity, map, isSidebarOpen]);

    return null;
};

export default function LeafletMap({ provinces, onProvinceClick, selectedCommodity, activeProvince, isSidebarOpen }: LeafletMapProps) {
    return (
        <MapContainer
            center={[-2.5, 118.0] as any}
            zoom={5}
            scrollWheelZoom={true}
            zoomControl={false} // Custom zoom is preferred
            className="w-full h-full"
        >
            {/* Google Maps Terrain Hybrid Style - More Green and Natural */}
            <TileLayer
                attribution='&copy; Google Maps'
                url="https://mt1.google.com/vt/lyrs=p&x={x}&y={y}&z={z}"
            />

            <MapController 
                activeProvince={activeProvince} 
                selectedCommodity={selectedCommodity} 
                isSidebarOpen={isSidebarOpen}
            />

            {provinces.map((prov, index) => (
                <Marker
                    key={index}
                    position={prov.coords}
                    icon={createCustomMarker(
                        selectedCommodity !== "Semua Komoditas (IHK)" 
                        ? (index % 3 === 0 ? '#ef4444' : (index % 2 === 0 ? '#f59e0b' : '#10b981'))
                        : (prov.risk === 'Tinggi' ? '#ef4444' : (prov.risk === 'Sedang' ? '#f59e0b' : '#10b981'))
                    )}
                    eventHandlers={{
                        click: () => onProvinceClick(prov),
                    }}
                >
                    <Popup maxWidth={260} className="custom-popup">
                        <div className="overflow-hidden rounded-xl bg-white shadow-2xl border border-slate-200">
                            {/* Blue Header Section */}
                            <div className="bg-primary p-3 pb-4 relative">
                                <div className="flex justify-between items-start gap-2">
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-sm font-black text-white leading-tight uppercase truncate">{prov.name}</h3>
                                        <p className="text-[7px] font-bold text-white/60 uppercase tracking-widest">Wilayah Pantauan I</p>
                                    </div>
                                    <div className={`px-1.5 py-0.5 rounded-full text-[7px] font-black uppercase bg-white/20 text-white border border-white/20 shrink-0`}>
                                        {prov.risk}
                                    </div>
                                </div>
                            </div>

                            {/* Body Section */}
                            <div className="p-4 space-y-4 bg-white relative z-10">
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="space-y-0.5">
                                        <p className="text-[7px] font-black text-muted-foreground uppercase tracking-widest">Inflasi</p>
                                        <p className={`text-lg font-black text-primary leading-none`}>{prov.value}</p>
                                    </div>
                                    <div className="space-y-1.5">
                                        <p className="text-[7px] font-black text-muted-foreground uppercase tracking-widest">Komoditas</p>
                                        <div className={`px-2 py-0.5 rounded-md text-[9px] font-black border inline-block ${getCommodityColor(selectedCommodity !== "Semua Komoditas (IHK)" ? selectedCommodity : prov.commodity)}`}>
                                            {selectedCommodity !== "Semua Komoditas (IHK)" ? selectedCommodity : prov.commodity}
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <div className="flex justify-between items-center">
                                        <p className="text-[7px] font-black text-muted-foreground uppercase tracking-widest">Tren 6 Bulan</p>
                                        <span className="text-[7px] font-black text-emerald-600 uppercase tracking-widest">Stabil</span>
                                    </div>
                                    <div className="flex items-end gap-1 h-8">
                                        {[30, 45, 25, 60, 85, 70].map((h, i) => (
                                            <div
                                                key={i}
                                                style={{ height: `${h}%` }}
                                                className={`flex-1 rounded-t-[1px] ${i === 4 ? 'bg-primary' : 'bg-slate-100'}`}
                                            />
                                        ))}
                                    </div>
                                </div>

                                <div className="pt-2 border-t border-slate-100">
                                    <p className="text-[6px] text-muted-foreground italic uppercase tracking-tighter">
                                        Data Real-time SWASTI
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
}
