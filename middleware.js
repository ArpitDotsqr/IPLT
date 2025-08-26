//  import { NextResponse } from "next/server";

// export default function middleware(request) {
//     const role = request.cookies.get('role');
//     const isLoggedIn = request.cookies.get('isLoggedIn');
//     const newURL = request.nextUrl.clone();

//     // console.log(role.value, "wtreterttttttttttttt")
//     // if (request.nextUrl.pathname.startsWith('/layout')) {
//     //     console.log("111111111111111111111111")
//     //     return NextResponse.json({ role: role?.value ? role.value : 'admin' });
//     // }

//     if (request.nextUrl.pathname.startsWith('/admin') && !isLoggedIn) {
//         console.log('22222222222222222222222222222222')
//         newURL.pathname = "/";
//         return NextResponse.redirect(newURL);
//     }
//     console.log('33333333333333333333333333333333333')
//     return NextResponse.next();
// }

// export const config = {
//     matcher: '/admin/:path*',
// }

import { NextResponse } from "next/server";

export default function middleware(request) {
    const role = request.cookies.get('role');
    const isLoggedIn = request.cookies.get('isLoggedIn');
    const isAdminRoute = request.nextUrl.pathname.startsWith('/admin');
    const newURL = request.nextUrl.clone();

    if (isAdminRoute) {
        if (!isLoggedIn) {
           // return NextResponse.redirect('https://localhost:3050/');
             return NextResponse.redirect('https://projects.uat.ipllogisticstechnologies.com/');
        } else if (role === 'admin' || role === 'superadmin') {
            return NextResponse.next();
        }
    }
    return NextResponse.next();
}

export const config = {
    matcher: '/admin/:path*',
}
