// import React, { useEffect, useState } from 'react'

// const GeoCodeAddress = ({ latitude, longitude }) => {
//     const [formattedAddress, setFormattedAddress] = useState(null);

//     useEffect(() => {
//         const geocoder = new window.google.maps.Geocoder();
//         const latlng = { lat: latitude, lng: longitude };

//         console.log(geocoder, "tryrtyrtyrtyyyyyyyyyyyy")

//         geocoder.geocode({ location: latlng }, (results, status) => {
//             console.log(status, "4564564tryrtyrty")
//             if (status === "OK") {
//                 if (results[0]) {
//                     const address = results[0].formatted_address;
//                     console.log(address, "ertertertertert")
//                     setFormattedAddress(address);
//                 } else {
//                     console.log();
//                 }
//             } else {
//                 console.error(status);
//             }
//         });
//     }, [latitude, longitude]);

//     console.log("qweqweqweqweqweqweqweqweqweq",latitude, longitude)
//     return (
//         <div>
//             {formattedAddress ? (
//                 <p>Formatted Address: {formattedAddress}</p>
//             ) : (
//                 <p>Loading address...</p>
//             )}
//         </div>
//     )
// }

// export default GeoCodeAddress