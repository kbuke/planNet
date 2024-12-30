import { Children } from "react"
import App from "./App"
import SignUpPg from "./Pages/1-SignUp/1-SignUpPg"

const routes = [
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <SignUpPg />
            }
        ]
    }
]

export default routes