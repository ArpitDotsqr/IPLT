import TripApprovalPage from '@/components/admin/Approval/tripId'
import VendorApprovePage from '@/components/admin/Approval/vendorId'
import React, { useState } from 'react'


const Id = () => {
  return (
    <>
      <TripApprovalPage />
    </>
  )
}

export default Id


// SSR with getServerSideProps

// export async function getServerSideProps(context) {
//   try {
//     const cookieIndex = context.req.rawHeaders.findIndex(header => header === 'Cookie');

//     if (cookieIndex !== -1) {
//       const cookieValue = context.req.rawHeaders[cookieIndex + 1];
//       const tokenMatch = cookieValue.match(/token=([^;]+)/);

//       if (tokenMatch) {
//         const token = tokenMatch[1];

//         const response = await fetch('https://uat.api.projects.ipllogisticstechnologies.com/trip/tripListForApprovals', {
//           method: 'POST',
//           cache: 'no-store',
//           headers: {
//             'Authorization': `Bearer ${token}`
//           },
//           body: JSON.stringify({ tripId: Number(40) }),
//         });

//        console.log(response, "responseeeeeeeeee")
//         if (response.ok) {
//           const tripApprovalData = await response.json();
//           return {
//             props: { tripApprovalData },
//           };
//         } else {
//           console.error(`Request failed with status ${response.status}`);
//         }
//       }
//     }

//     // Handle the case where the token is not present
//     console.error('Token is not present');
//   } catch (error) {
//     console.error('Error fetching data:', error);
//   }

//   return {
//     props: {
//       tripApprovalData: null,
//     },
//   };
// }

