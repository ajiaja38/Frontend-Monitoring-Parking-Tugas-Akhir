/* eslint-disable react/prop-types */
import React, { useState, useRef, useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import markerIconPng from 'leaflet/dist/images/marker-icon.png'
import L, { Icon } from 'leaflet'
import ModalCaptureCameraDetail from '../assets/modal/ModalCaptureCam'
import ModalSensor from '../assets/modal/ModalSensor'
import ToastNotification from '../assets/helpers/toast'
import currentMarker from '../assets/images/marker.png'

const MapsLeafletUser = ({ devices }) => {
  const mapRef = useRef(null)

  const [modalCamOpen, setModalCamOpen] = useState(false)
  const [modalSensorOpen, setModalSensorOpen] = useState(false)
  const [guidDevice, setGuidDevice] = useState(null)
  const [deviceName, setDeviceName] = useState(null)
  const [selectedDevice, setSelectedDevice] = useState(null)
  const [currentLocation, setCurrentLocation] = useState(null)
  const [routingControl, setRoutingControl] = useState(null)
  const [isRouteVisible, setRouteVisible] = useState(false)
  const [currentMarkerLayer, setCurrentMarkerLayer] = useState(null)
  const [distance, setDistance] = useState(null)

  const onOpenModal = (type, guid, name) => {
    setGuidDevice(guid)
    setDeviceName(name)
    if (type === 'aktuator') {
      setModalCamOpen(true)
    } else if (type === 'sensor') {
      setModalSensorOpen(true)
    }
  }

  const onCloseModalCam = () => setModalCamOpen(false)
  const onCloseModalSensor = () => setModalSensorOpen(false)

  const handleLocationSelected = (e) => {
    const selectedValue = e.target.value
    const selectedDevice = devices.find((device) => device.name === selectedValue)
    setSelectedDevice(selectedDevice)
  }

  const flyToLocation = (device) => {
    const { latitude, longtitude } = device
    if (mapRef.current) {
      mapRef.current.flyTo([latitude, longtitude], 18, {
        duration: 1
      })
    }
  }

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords
        setCurrentLocation([latitude, longitude])
      },
      error => console.log(error)
    )
  }

  const toggleRoute = (latitude, longtitude) => {
    setRouteVisible(!isRouteVisible)
    if (isRouteVisible) {
      // Jika rute sedang aktif, matikan rute
      if (routingControl) {
        mapRef.current.removeControl(routingControl)
        setRoutingControl(null)
      }
      if (currentMarkerLayer) {
        mapRef.current.removeLayer(currentMarkerLayer)
        setCurrentMarkerLayer(null)
      }
    } else {
      // Jika rute sedang nonaktif, aktifkan rute
      onRouteClick(latitude, longtitude)
    }
  }

  const onRouteClick = (latitude, longitude) => {
    if (!currentLocation) {
      ToastNotification.toastError('Lokasi saat ini tidak ditemukan!')
      return
    }

    const waypoints = [L.latLng(currentLocation), L.latLng(latitude, longitude)]

    if (routingControl && mapRef.current) {
      mapRef.current.removeControl(routingControl)
      setRoutingControl(null)
    }

    const markerImg = L.icon({
      iconUrl: currentMarker,
      iconSize: [40, 40],
      iconAnchor: [16, 32]
    })

    const markerLayer = L.marker(currentLocation, { icon: markerImg }).addTo(mapRef.current)
    setCurrentMarkerLayer(markerLayer)

    const control = L.Routing.control({
      waypoints,
      routeWhileDragging: false,
      dragging: true,
      createMarker: () => { return null }
    }).addTo(mapRef.current)

    control.on('routesfound', (e) => {
      const { routes } = e
      const route = routes[0]
      const totalDistanceInMeters = route.summary.totalDistance
      let totalDistance

      if (totalDistanceInMeters > 1000) {
        totalDistance = `${(totalDistanceInMeters / 1000).toFixed(1)} Km`
      } else {
        totalDistance = `${totalDistanceInMeters.toFixed(0)} meter`
      }

      setDistance(totalDistance)
    })

    control.hide()

    setRoutingControl(control)
  }

  const handleGoogleMaps = (latitude, longitude) => {
    const url = `https://www.google.com/maps/dir/${currentLocation}/${latitude},${longitude}`
    window.open(url, '_blank')
  }

  useEffect(() => {
    if (selectedDevice) {
      flyToLocation(selectedDevice)
    }
  }, [selectedDevice])

  useEffect(() => {
    const interval = setInterval(() => {
      getLocation()
    }, 2000)

    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <>
      <select
        onChange={handleLocationSelected}
        className='p-2 backdrop-blur-sm bg-white/80 outline-none border w-60 md:w-[19rem] rounded-lg shadow-md mr-6 fixed bottom-7 left-3 z-[999] text-gray-900 hover:bg-gray-100 transition-all duration-200 ease-in-out'
      >
        <option
          readOnly
          className='text-gray-900'
        >
          Pilih Lokasi Parkir
        </option>
        {devices.map((device) => (
          <option key={device.guid} value={device.name} className='text-gray-900'>{device.name}</option>
        ))}
      </select>
      <MapContainer
        ref={mapRef}
        center={[-6.890681124895764, 107.61128169061378]}
        zoom={15}
        zoomControl={false}
        scrollWheelZoom={true}
        className='w-full h-screen z-0'
      >
        <ZoomControl position="bottomright"/>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {devices.map(device => (
          <Marker
            key={device.guid}
            position={[device.latitude, device.longtitude]}
            icon={new Icon({ iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41] })}
            eventHandlers={{
              mouseover: (e) => {
                e.target.openPopup()
              }
            }}
          >
            <Popup>
              <div className='flex flex-col items-center justify-center'>
                <div className='font-semibold text-sm text-center'>
                  {device.name}
                </div>
                <div className='w-52 py-2 flex gap-1 items-center justify-around'>
                  <button
                    onClick={() => onOpenModal(device.type, device.guid, device.name)}
                    className='py-2 px-3 bg-red-600 hover:bg-red-300 active:bg-red-600 rounded-lg text-white shadow-lg'
                  >
                    Lihat Detail
                  </button>
                  <button
                    onClick={() => toggleRoute(device.latitude, device.longtitude)}
                    className='py-2 px-3 bg-blue-600 hover:bg-blue-300 active:bg-blue-600 rounded-lg text-white shadow-lg'
                  >
                    {
                      isRouteVisible
                        ? (<>Matikan Rute</>)
                        : (<>Lihat Rute</>)
                    }
                  </button>
                </div>
                <div>
                    {
                      isRouteVisible && (
                        <div className='flex flex-col gap-2 justify-center items-center'>
                          <button
                            onClick={() => handleGoogleMaps(device.latitude, device.longtitude)}
                            className='py-2 px-3 bg-yellow-400 hover:bg-yellow-300 active:bg-yellow-400 rounded-lg text-white shadow-lg'
                          >
                            Rute Google Maps
                          </button>
                          <h1>Jarak menuju lokasi: {distance}</h1>
                        </div>
                      )
                    }
                  </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      {modalCamOpen &&
        <ModalCaptureCameraDetail open={modalCamOpen} onCloseModal={onCloseModalCam} guid={guidDevice} name={deviceName}/>
      }
      {modalSensorOpen &&
        <ModalSensor open={modalSensorOpen} onCloseModal={onCloseModalSensor} guid={guidDevice} name={deviceName}/>
      }
    </>
  )
}

export default MapsLeafletUser
