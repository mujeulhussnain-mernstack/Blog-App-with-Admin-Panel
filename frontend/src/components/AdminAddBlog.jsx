import { useState, useRef, useEffect } from "react";
import { Upload, Sparkles } from "lucide-react";
import axios from "axios"
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { toast } from "react-hot-toast"
import { API_END_POINT } from "../constants";
import { Loader2 } from "lucide-react";
const AdminAddBlog = () => {
  const [imagePreview, setImagePreview] = useState("");
  const [isPublished, setIsPublished] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [spinner, setSpinner] = useState(false)
  const [contentSpinner, setContentSpinner] = useState(false)
  const fileInputRef = useRef(null);
  const editorRef = useRef();
  const quillRef = useRef();
  const titleRef = useRef();
  const subtitleRef = useRef();
  const categoryRef = useRef();

  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: 'snow'
      });
    }
  }, []);

  const generateContent = async () => {
    try {
      setContentSpinner(true)
      const title = titleRef.current.value.trim();
      const res = await axios.post(
        `${API_END_POINT}/post/generatecontent`,
        { title },
        {
          headers: {
            "Content-Type": 'application/json'
          },
          withCredentials: true
        }
      );

      if (res.data.success) {
        if (quillRef.current && res.data.content) {
          quillRef.current.root.innerHTML = res.data.content;
          toast.success('Content generated successfully!');
        }
      }
    } catch (error) {
      toast.error(error.response.data.message)
      console.log(error)
    } finally {
      setContentSpinner(false)
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const inputDataHandler = async (e) => {
    e.preventDefault();

    try {
      setSpinner(true)
      // Create FormData
      const formData = new FormData();

      // Add text fields
      formData.append('title', titleRef.current?.value || "");
      formData.append('subTitle', subtitleRef.current?.value || "");
      formData.append('category', categoryRef.current?.value || "");
      formData.append('isPublished', isPublished.toString());
      formData.append('content', quillRef.current?.root.innerHTML || "");

      // Add image file
      if (selectedImage && selectedImage instanceof File) {
        formData.append('image', selectedImage);
      }

      const res = await axios.post(
        `${API_END_POINT}/post/addpost`,
        formData, // Send FormData object directly
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          withCredentials: true
        }
      );

      if (res.data.success) {
        toast.success(res.data.message)
      }
      resetForm();
    } catch (error) {
      toast.error(error.response.data.message)
    } finally {
      setSpinner(false)
    }
  };
  const resetForm = () => {
    if (titleRef.current) titleRef.current.value = '';
    if (subtitleRef.current) subtitleRef.current.value = '';
    if (categoryRef.current) categoryRef.current.value = '';
    setIsPublished(true);
    if (quillRef.current) quillRef.current.root.innerHTML = '';
    setSelectedImage(null);
    setImagePreview('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };
  return (
    <div className="p-1 lg:p-6 max-w-3xl">
      <h1 className="text-xl font-bold text-gray-800 mb-6">Create Post</h1>
      <form onSubmit={inputDataHandler}>
        <div className="space-y-5">

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
            <input
              ref={titleRef}
              type="text"
              placeholder="Enter post title"
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>


          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Subtitle</label>
            <input
              ref={subtitleRef}
              type="text"
              placeholder="Brief description"
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>


          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Image *</label>
            {imagePreview ? (
              <div>
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-48 object-cover rounded-lg mb-2"
                />
                <button
                  type="button"
                  onClick={() => {
                    setImagePreview("");
                    setSelectedImage(null);
                  }}
                  className="text-sm text-red-600"
                >
                  Remove Image
                </button>
              </div>
            ) : (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload className="mx-auto mb-2 text-gray-400" size={24} />
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="text-blue-600 hover:text-blue-800"
                >
                  Upload Image
                </button>
              </div>
            )}
          </div>


          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium text-gray-700">Content *</label>
              <button
                type="button"
                onClick={generateContent}
                className="flex items-center gap-2 px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 cursor-pointer"
              >
                <Sparkles size={14} />
                Generate with AI
              </button>
            </div>
            <div className="border border-gray-300 rounded-lg overflow-hidden">
              <div className="relative h-64">
                <div ref={editorRef} />
                {contentSpinner && <div className="absolute inset-0 flex-center"><span className="animate-spin"><Loader2 size={30} /></span></div>}
              </div>
            </div>
          </div>


          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
            <select
              ref={categoryRef}
              className="w-full p-3 border border-gray-300 rounded-lg"
            >
              <option value="">Select category</option>
              <option value="Tech">Tech</option>
              <option value="Philosophy">Philosophy</option>
              <option value="Daily Living">Daily Living</option>
            </select>
          </div>


          <div className="flex items-center gap-3 p-3 border border-gray-300 rounded-lg">
            <input
              type="checkbox"
              id="publish"
              checked={isPublished}
              onChange={(e) => setIsPublished(e.target.checked)}
              className="w-4 h-4"
            />
            <label htmlFor="publish" className="text-gray-700">
              Publish immediately
            </label>
          </div>


          <button
            type="submit"
            className="w-full py-3 text-white rounded-lg bg-blue-500 font-medium cursor-pointer hover:bg-blue-600 duration-200 transition-colors flex-center"
          >
            {spinner ? <span className="animate-spin"><Loader2 size={24} /></span> : "Add Blog"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminAddBlog;