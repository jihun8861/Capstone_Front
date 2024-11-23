import { Map, MapMarker } from "react-kakao-maps-sdk";

const KakaoMap = () => {
  return (
    <Map
      center={{ lat: 35.249273078569765, lng: 128.90193570284234 }}
      style={{ width: "100%", height: "500px" }}
      level={3}
    >
      <MapMarker
        position={{ lat: 35.249273078569765, lng: 128.90193570284234 }}
      >
        {"🚩[장영실관]P&N"}
      </MapMarker>
    </Map>
  );
};
export default KakaoMap;
