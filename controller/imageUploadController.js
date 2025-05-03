const { handleUpload, upload } = require('@vercel/blob/client');



const uploadImage = async()=>{
    try{
        const jsonResponse = await handleUpload({
            body,
            request,  
        })
    }
}


/*
interface GenerateClientTokenEvent {
    type: (typeof EventTypes)['generateClientToken'];
    payload: {
        pathname: string;
        callbackUrl: string;
        multipart: boolean;
        clientPayload: string | null;
    };
}
*/