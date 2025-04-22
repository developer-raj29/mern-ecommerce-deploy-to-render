import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const CheckAuth = ({ children, requiredRole }) => {
  const location = useLocation();

  const { user, isAuthenticated, isLoading } = useSelector(
    (state) => state.auth
  );
  console.log("user: ", user, "isAuthenticated: ", isAuthenticated, "isloading: ", isLoading);

  console.log("location.pathname: ", location.pathname, "isAuthenticated: ", isAuthenticated);

  if (location.pathname === "/") {
    if (isLoading) {
      return <Loader />; // Show a loading state instead of redirecting
    } else if (!isAuthenticated) {
      return <Navigate to="/auth/login" />;
    }

    console.log(user?.role === "admin" ? "1 /admin/dashboard" : "1 /shop/home");
    return (
      <Navigate
        to={user?.role === "admin" ? "/admin/dashboard" : "/shop/home"}
      />
    );
  }

  // if (!isAuthenticated) {
  //   return <Navigate to="/unauth-page" replace />;
  // }

  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to="/unauth-page" replace />;
  }
    
  console.log("location.pathname: ", location.pathname, "isAuthenticated: ", isAuthenticated);

  if (
    !isAuthenticated &&
    !(
      location.pathname.includes("/login") ||
      location.pathname.includes("/register")
    )
  ) {
    return <Navigate to="/auth/login" />;
  }

  if (
    isAuthenticated &&
    (location.pathname.includes("/login") ||
      location.pathname.includes("/register"))
  ) {
    console.log(user?.role === "admin" ? "2 /admin/dashboard" : "2 /shop/home");

    return (
      <Navigate
        to={user?.role === "admin" ? "/admin/dashboard" : "/shop/home"}
      />
    );
  }

  console.log(location.pathname, isAuthenticated);

  if (
    isAuthenticated &&
    user?.role !== "admin" &&
    location.pathname.includes("admin")
  ) {
    return <Navigate to="/unauth-page" />;
  }

  if (
    isAuthenticated &&
    user?.role === "admin" &&
    location.pathname.includes("shop")
  ) {
    console.log(user?.role === "admin" ? "3 /admin/dashboard" : "3 /shop/home");
    return <Navigate to="/admin/dashboard" />;
  }

  return <>{children}</>;
};

export default CheckAuth;

// import { useSelector } from "react-redux";
// import { Navigate, useLocation } from "react-router-dom";
// import Loader from "./Loader"; // Assuming Loader is in the same folder

// const CheckAuth = ({ children, requiredRole }) => {
//   const location = useLocation();
//   const { user, isAuthenticated, isLoading } = useSelector(
//     (state) => state.auth
//   );

//   // 1. Show loader while checking auth
//   if (isLoading) return <Loader />;

//   // 2. Redirect from `/` after login based on role
//   if (location.pathname === "/") {
//     if (!isAuthenticated) return <Navigate to="/auth/login" />;
//     return (
//       <Navigate
//         to={user?.role === "admin" ? "/admin/dashboard" : "/shop/home"}
//         replace
//       />
//     );
//   }

//   // 3. Protect private routes
//   if (!isAuthenticated) {
//     return <Navigate to="/unauth-page" replace />;
//   }

//   // 4. Role restriction on admin routes
//   if (requiredRole && user?.role !== requiredRole) {
//     return <Navigate to="/unauth-page" replace />;
//   }

//   // 5. Authenticated user trying to access /login or /register
//   const isAuthPage =
//     location.pathname.includes("/login") ||
//     location.pathname.includes("/register");

//   if (isAuthenticated && isAuthPage) {
//     return (
//       <Navigate
//         to={user?.role === "admin" ? "/admin/dashboard" : "/shop/home"}
//         replace
//       />
//     );
//   }

//   // 6. Non-admin trying to access admin panel
//   if (
//     isAuthenticated &&
//     user?.role !== "admin" &&
//     location.pathname.includes("/admin")
//   ) {
//     return <Navigate to="/unauth-page" replace />;
//   }

//   // 7. Admin trying to access shop
//   if (
//     isAuthenticated &&
//     user?.role === "admin" &&
//     location.pathname.includes("/shop")
//   ) {
//     return <Navigate to="/admin/dashboard" replace />;
//   }

//   return <>{children}</>;
// };

// export default CheckAuth;
