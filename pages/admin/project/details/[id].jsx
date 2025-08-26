
import ProjectDetails from "@/components/admin/Project/ProjectDetails";
import { getProjectDetails } from "@/redux/actions/project/projectData";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";


const ProjectDetailPage = () => {
    const dispatch = useDispatch()
    const router = useRouter()

    useEffect(() => {
        if (router.query.id) {
            dispatch(getProjectDetails({ projectId: router.query.id }))
        }
    }, [router.query.id])

    return (
        <>
            <ProjectDetails />
        </>
    )
}

export default ProjectDetailPage;

// SSR with getServerSideProps

// export async function getServerSideProps(context) {
//     try {
//         const cookieIndex = context.req.rawHeaders.findIndex(header => header === 'Cookie');

//         if (cookieIndex !== -1) {
//             const cookieValue = context.req.rawHeaders[cookieIndex + 1];

//             const tokenMatch = cookieValue.match(/token=([^;]+)/);

//             if (tokenMatch) {
//                 const token = tokenMatch[1];

//                 // console.log('Token:', token);

//                 const response = await fetch('https://uat.api.projects.ipllogisticstechnologies.com/project/getProjectDetail', {
//                     method: 'POST',
//                     cache: 'no-store',
//                     headers: {
//                         'Authorization': `Bearer ${token}`
//                     },
//                     body: JSON.stringify({ projectId: Number(2) }),

//                 });
//                 console.log('Request Body:', JSON.stringify({ projectId: Number(2) }));

//                 const responseBody = await response.text();
//                 console.log('Raw Response Body:', responseBody);
//                 // console.log(response, "zxczxccccccccccc")
//                 // Check if the response status is OK
//                 if (response.ok) {
//                     const projectData = await response.json();

//                     console.log('Parsed Project Data:', projectData);

//                     return {
//                         props: {
//                             projectData,
//                         },
//                     };
//                 } else {
//                     console.error(`Request failed with status ${response.status}`);
//                     return {
//                         props: {
//                             projectData: null,
//                         },
//                     };
//                 }
//             }
//         }

//         // Handle the case where the token is not present
//         console.error('Token is not present');
//         return {
//             props: {
//                 projectData: null,
//             },
//         };
//     } catch (error) {
//         console.error('Error fetching data:', error);

//         return {
//             props: {
//                 projectData: null,
//             },
//         };
//     }
// }


