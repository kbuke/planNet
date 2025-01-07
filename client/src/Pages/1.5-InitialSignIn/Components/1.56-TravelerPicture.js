import "./1.56-TravelerPicture.css"

export default function TravelerPicture({
    preview,
    handleUpdatePic
}){
    return(
        <>
            <div
                id="initialProfilePicContainer"
            >
                <h2>Please Upload a Profile Picture</h2>

                <input 
                    type="file"
                    id="fileSelect"
                    accept=".png, .jpg, .jpeg"
                    onChange={handleUpdatePic}
                />
            </div>

            <div
                id="signUpPicContainer"
            >
                <img 
                    src={preview}
                    id="initialProfilePicTest"
                />
            </div>
        </>
    )
}