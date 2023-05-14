import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import {Post as IPost, } from "./main";
import { auth, db } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";

interface Props {
    post: IPost;
}
interface Like{
    likeId: string;
    userId: string;
}

export const Post =  (props: Props) => {
    const {post } = props;
    const [user] = useAuthState(auth); 
    const [likes, setLikes] = useState<Like[] | null>(null);
    const likesRef = collection(db , "likes");
    const likesDoc = query(likesRef , where("postId", "==", post.id));

    const getLikes = async() => {
        const data = await getDocs(likesDoc);
        setLikes(data.docs.map((doc) =>({userId: doc.data().userId, likeId: doc.id})));
    };

    const addLike = async () => {
      try{  
        const newDoc =  await addDoc(likesRef, {userId: user?.uid, postId: post.id});
       if(user){
        setLikes((prev) => prev ? 
        [...prev, {userId: user?.uid , likeId: newDoc.id}] :
        [{userId: user?.uid, likeId: newDoc.id}] );
       }
       }
       catch (err) {console.log(err);}
    };
    
    const removeLike = async () => {
        try{  
            const DeleteLikeQuery = query(likesRef , 
                where("postId", "==", post.id),
                where("userId", "==", user?.uid)

                );
            const DeleteLikeData = await getDocs(DeleteLikeQuery);
            const LikeId = DeleteLikeData.docs[0].id;
            const DeleteLike = doc(db, "likes", LikeId);
            if(user) {
                setLikes((prev) => prev && prev.filter( (like) => like.likeId !==  LikeId))
            }
            await deleteDoc(DeleteLike);
         }catch (err) {console.log(err);}
      };

    const hasUserLiked = likes?.find((like) => like.userId === user?.uid)
    useEffect(() => {
        getLikes();
    }, []);

  return (<div className="homepage">
     <div className="title">
          <h2>{post.title}</h2>
          <h3>@{post.username}</h3>
     </div>
     <div className="body">
         <p>{post.description}</p>
     </div>
     <div className="footer">
         <button onClick={hasUserLiked ?  removeLike : addLike}> {hasUserLiked ? <>&#128078;</> :<>&#128077;</> }</button>
         {likes && <p>Likes: {likes.length}</p>}
      </div>
    </div>
)}