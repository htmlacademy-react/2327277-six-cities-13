import {useRef, useEffect} from 'react';
import {Icon, Marker, layerGroup} from 'leaflet';
import useMap from '../../hooks/use-map';
import { OfferPreview, City } from '../../types/offer-types';
import 'leaflet/dist/leaflet.css';

type MapProps = {
  city: City|undefined;
  offers: OfferPreview[];
  selectedOffer: OfferPreview | undefined;
};

const defaultCustomIcon = new Icon({
  iconUrl: 'img/pin.svg',
  iconSize: [28, 40],
  iconAnchor: [14, 40]
});

const currentCustomIcon = new Icon({
  iconUrl: 'img/pin-active.svg',
  iconSize: [28, 40],
  iconAnchor: [14, 40]
});

export default function Map({ city, offers, selectedOffer }: MapProps) {

  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  useEffect(() => {
    if(map && city) {
      map.setView([city.location.latitude, city.location.longitude],city.location.zoom);
    }
  }, [map,city]);


  useEffect(() => {
    if (map) {
      const markerLayer = layerGroup().addTo(map);
      offers.forEach((offer) => {
        const marker = new Marker({
          lat: offer.location.latitude,
          lng: offer.location.longitude
        });

        marker
          .setIcon(
            selectedOffer !== undefined && offer.id === selectedOffer.id
              ? currentCustomIcon
              : defaultCustomIcon
          )
          .addTo(markerLayer);
      });

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, offers, selectedOffer]);

  return (
    <section className="cities__map map"
      ref={mapRef}
      style={{
        height:'100%',
        minHeight:'500px',
        width:'100%',
        maxWidth:'1144px',
        margin:'0 auto',
      }}
    >
    </section>
  );
}

