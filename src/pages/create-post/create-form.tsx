import {useForm} from "react-hook-form";
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {addDoc, collection} from "firebase/firestore";
import {auth , db} from '../../config/firebase';
import { useAuthState } from "react-firebase-hooks/auth";

interface CreateFormData{
    title: string;
    description: string;
}

export const CreateForm = () => {
    const [user] = useAuthState(auth);

    const schema = yup.object().shape({
        title: yup.string().required('ERROR!!! You must add title!'),
        description: yup.string().required("ERROR! You must add the description!"),
    });

    const {register, handleSubmit, formState: {errors},} = useForm<CreateFormData>({
        resolver: yupResolver(schema),
    });
    
    const postsRef = collection(db , "posts");

    const onCreatePost = async (data: CreateFormData) => {
        await addDoc(postsRef, {
            title:data.title,
            description: data.description,
            username: user?.displayName,
            userId: user?.uid, 
        });
    };

    return (
   <div className="box">
        <h2>Create New Post</h2>
     <form onSubmit={handleSubmit(onCreatePost)}>
        <input placeholder="Enter title" {...register('title')}/>
        <p style={{color: 'red'}}>{errors.title?.message}</p>
        <textarea placeholder="Enter Description" {...register('description')}/>
        <p style={{color: "red"}}>{errors.description?.message}</p>
        <input type="submit"/>
     </form>
    </div>
    );
}