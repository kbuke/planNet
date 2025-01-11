
import App from "./App"
import Route from "./Pages/0.5-Route/0.5-Route"
import SignUpPg from "./Pages/1-SignUp/1-SignUpPg"
import Feed from "./Pages/3-Feed/Feed"
import AdminPg from "./Pages/2-AdminPg/2-AdminPg"

const routes = [
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <Route />,
                children: [
                    {
                        path: "/signup",
                        element: <SignUpPg />
                    },
                    {
                        path: "/",
                        element: <Feed />
                    }
                ]
            },
            {
                path: "/admin",
                element: <AdminPg />
            }
        ]
    }
];

export default routes;





