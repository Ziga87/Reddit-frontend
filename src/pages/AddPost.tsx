import DefaultLayout from "../layout/DefaultLayout.tsx";
import AddPost from "../components/Posts/AddPost.tsx";

const AddPostPg = () => {
    return (
        <DefaultLayout>
            <div className="container mx-auto p-4">
                <AddPost/>
            </div>
        </DefaultLayout>
    );
};

export default AddPostPg;