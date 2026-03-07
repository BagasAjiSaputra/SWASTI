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
      border: 2px solid white;
      box-shadow: 0 0 15px ${color};
      "></div>`,
        iconSize: [14, 14],
        iconAnchor: [7, 7],
        popupAnchor: [130, 0],
    });
};

const getCommodityColor = (commodity: string) => {
    const c = commodity.toLowerCase();
    if (c.includes('beras')) return 'bg-blue-500/20 text-blue-400 border-blue-500/20';
    if (c.includes('cabai')) return 'bg-red-500/20 text-red-400 border-red-500/20';
    if (c.includes('bawang')) return 'bg-purple-500/20 text-purple-400 border-purple-500/20';
    if (c.includes('daging')) return 'bg-amber-500/20 text-amber-400 border-amber-500/20';
    if (c.includes('telur')) return 'bg-orange-500/20 text-orange-400 border-orange-500/20';
    if (c.includes('minyak') || c.includes('gula')) return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/20';
    if (c.includes('ikan')) return 'bg-cyan-500/20 text-cyan-400 border-cyan-500/20';
    return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/20';
};

const MapController = ({ activeProvince, selectedCommodity }: { activeProvince: any, selectedCommodity: string }) => {
    const map = useMap();

    useEffect(() => {
        if (activeProvince && activeProvince.coords) {
            // Pan to center without changing zoom level
            map.panTo(activeProvince.coords, { animate: true });

            // Find marker and open popup
            setTimeout(() => {
                map.eachLayer((layer: any) => {
                    if (layer instanceof L.Marker) {
                        const markerPos = layer.getLatLng();
                        if (Math.abs(markerPos.lat - activeProvince.coords[0]) < 0.01 &&
                            Math.abs(markerPos.lng - activeProvince.coords[1]) < 0.01) {
                            layer.closePopup();
                            layer.openPopup();
                        }
                    }
                });
            }, 300);
        }
    }, [activeProvince, selectedCommodity, map]);

    return null;
};

export default function LeafletMap({ provinces, onProvinceClick, selectedCommodity, activeProvince }: LeafletMapProps) {
    return (
        <MapContainer
            center={[-2.5, 118.0] as any}
            zoom={5}
            scrollWheelZoom={true}
            zoomControl={true}
            className="w-full h-full"
        >
            {/* Premium Dark Tiles from CartoDB */}
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            />

            <MapController activeProvince={activeProvince} selectedCommodity={selectedCommodity} />

            {provinces.map((prov, index) => (
                <Marker
                    key={index}
                    position={prov.coords}
                    icon={createCustomMarker(prov.risk === 'Tinggi' ? '#ef4444' : (prov.risk === 'Sedang' ? '#f59e0b' : '#10b981'))}
                    eventHandlers={{
                        click: () => onProvinceClick(prov),
                    }}
                >
                    <Popup maxWidth={260} className="custom-popup">
                        <div className="overflow-hidden rounded-xl bg-[#0f172a] shadow-2xl border border-white/10">
                            {/* Compact Blue Header Section */}
                            <div className="bg-blue-600 p-3 pb-4 relative">
                                <div className="flex justify-between items-start gap-2">
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-sm font-black text-white leading-tight uppercase truncate">{prov.name}</h3>
                                        <p className="text-[7px] font-bold text-blue-100/60 uppercase tracking-widest">Wilayah Pantauan I</p>
                                    </div>
                                    <div className={`px-1.5 py-0.5 rounded-full text-[7px] font-black uppercase bg-white/20 text-white border border-white/20 shrink-0`}>
                                        {prov.risk}
                                    </div>
                                </div>
                            </div>

                            {/* Body Section - More Compact */}
                            <div className="p-4 space-y-4 bg-[#0f172a] relative z-10">
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="space-y-0.5">
                                        <p className="text-[7px] font-black text-white/40 uppercase tracking-widest">Inflasi</p>
                                        <p className={`text-lg font-black text-blue-400 leading-none`}>{prov.value}</p>
                                    </div>
                                    <div className="space-y-1.5">
                                        <p className="text-[7px] font-black text-white/40 uppercase tracking-widest">Komoditas</p>
                                        <div className={`px-2 py-0.5 rounded-md text-[9px] font-black border inline-block ${getCommodityColor(selectedCommodity !== "Semua Komoditas (IHK)" ? selectedCommodity : prov.commodity)}`}>
                                            {selectedCommodity !== "Semua Komoditas (IHK)" ? selectedCommodity : prov.commodity}
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <div className="flex justify-between items-center">
                                        <p className="text-[7px] font-black text-white/40 uppercase tracking-widest">Tren 6 Bulan</p>
                                        <span className="text-[7px] font-black text-emerald-400 uppercase tracking-widest">Stabil</span>
                                    </div>
                                    <div className="flex items-end gap-1 h-8">
                                        {[30, 45, 25, 60, 85, 70].map((h, i) => (
                                            <div
                                                key={i}
                                                style={{ height: `${h}%` }}
                                                className={`flex-1 rounded-t-[1px] ${i === 4 ? 'bg-blue-500' : 'bg-blue-900/40'}`}
                                            />
                                        ))}
                                    </div>
                                </div>

                                <div className="pt-2 border-t border-white/5">
                                    <p className="text-[6px] text-white/20 italic uppercase tracking-tighter">
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
