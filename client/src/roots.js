import { Children } from "react"
import App from "./App"
import Route from "./Pages/0.5-Route/0.5-Route"
import SignUpPg from "./Pages/1-SignUp/1-SignUpPg"

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
                        path: "/",
                        element: <SignUpPg />
                    }
                ]
            }
        ]
    }
]

export default routes