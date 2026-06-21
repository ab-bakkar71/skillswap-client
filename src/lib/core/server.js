'use server'
const  baseUrl = process.env.NEXT_PUBLIC_BASE_URL;


export const serverPost = async (path, data) => {
    const res = await fetch(`${baseUrl}${path}`,{
        method: "POST",
        headers:{
            'content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
   return res.json();
}