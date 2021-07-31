import React from 'react';
import Router from 'next/router';
import Cookies from 'js-cookie'

const login = '/login?redirected=true'; // Define your login route address.
console.log("All Cookies", Cookies.get())
console.log("cookie 1", Cookies.get('log'))
/**
 * Check user authentication and authorization
 * It depends on you and your auth service provider.
 * @returns {{auth: null}}
 */
const checkUserAuthentication = () => {

	let loggedin
	
	// loggedin = document.cookie
	// .split('; ')
	// .find(row => row.startsWith('log'))
	// .split('=')[1]


		console.log("cookie 2", Cookies.get('log'))
		console.log("loggedin", loggedin)

		// if ( Cookies.get('log') === undefined ) {
		// 	loggedin = ""
		// } else {
		// 	loggedin = Cookies.get('log')
		// }


  //if ( cookieCutter.get('login') ) {
  if ( loggedin !== "" && loggedin !== undefined ) {
    return { auth: true }
  } else {
    return { auth: null }; // change null to { isAdmin: true } for test it.
  }
};

export default WrappedComponent => {
  const hocComponent = ({ ...props }) => <WrappedComponent {...props} />;

  hocComponent.getInitialProps = async (context) => {
    const userAuth = await checkUserAuthentication();

    // Are you an authorized user or not?
    if (!userAuth?.auth) {
      // Handle server-side and client-side rendering.
      if (context.res) {
        context.res?.writeHead(302, {
          Location: login,
        });
        context.res?.end();
      } else {
        Router.replace(login);
      }
    } else if (WrappedComponent.getInitialProps) {
      const wrappedProps = await WrappedComponent.getInitialProps({...context, auth: userAuth});
      return { ...wrappedProps, userAuth };
    }

    return { userAuth };
  };

  return hocComponent;
};