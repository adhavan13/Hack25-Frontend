import React, { useState } from 'react';

const PostForm = () => {
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState('');
  const [loading, setLoading] = useState(false);

  // Handle image file selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image || !caption) {
      alert('Both image and caption are required!');
      return;
    }

    setLoading(true); // Start loading

    const formData = new FormData();
    formData.append('image', image); // Append image file
    formData.append('caption', caption); // Append caption text

    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Post created:', data);
        // Handle success (maybe reset form, show success message, etc.)
      } else {
        throw new Error('Failed to create post');
      }
    } catch (error) {
      console.error('Error uploading post:', error);
      alert('Error uploading post!');
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div>
      <h2>Create a New Post</h2>
      <form onSubmit={handleSubmit}>
        {/* Image input */}
        <div>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            required
          />
        </div>

        {/* Caption input */}
        <div>
          <input
            type="text"
            placeholder="Enter caption"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            required
          />
        </div>

        {/* Submit button */}
        <button type="submit" disabled={loading}>
          {loading ? 'Uploading...' : 'Submit Post'}
        </button>
      </form>
    </div>
  );
};

export default PostForm;