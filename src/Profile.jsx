import { useState, useEffect } from "react";
import { supabase } from "./utils/SupaSupplier";
import Layout from "./components/Layout";

const Profile = () => {
  const [profile, setProfile] = useState({
    full_name: "",
    username: "",
    avatar_url: "",
    no_telepon: "",
    email: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .single();

    if (error) {
      console.error("Error fetching profile:", error);
    } else {
      setProfile(data);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileExt = file.name.split(".").pop();
      const fileName = `${profile.username}.${fileExt}`;
      const filePath = `avatars/${fileName}`;

      setAvatarPreview(URL.createObjectURL(file));

      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file, { upsert: true });

      if (uploadError) {
        console.error("Error uploading avatar:", uploadError);
        return;
      }

      const publicURL = `https://qehdylpssbqwhaiwvzcp.supabase.co/storage/v1/object/public/avatars/${filePath}`;

      setProfile((prevProfile) => ({
        ...prevProfile,
        avatar_url: publicURL,
      }));

      setAvatarPreview(publicURL);
      const { error: updateError } = await supabase
        .from("profiles")
        .update({ avatar_url: publicURL })
        .eq("id", profile.id);

      if (updateError) {
        console.error("Error updating profile with avatar URL:", updateError);
      }
    }
  };

  const updateProfile = async () => {
    const { error } = await supabase
      .from("profiles")
      .update({
        full_name: profile.full_name,
        username: profile.username,
        avatar_url: profile.avatar_url,
        no_telepon: profile.no_telepon,
        email: profile.email,
      })
      .eq("id", profile.id);

    if (error) {
      console.error("Error updating profile:", error);
    } else {
      setIsEditing(false);
      window.location.reload();
    }
  };

  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center p-8 bg-gray-100 dark:bg-gray-800">
        <div className="w-full max-w-lg space-y-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white">
            Profile
          </h2>
          <div className="flex flex-col items-center">
            <img
              src={avatarPreview || profile.avatar_url}
              alt="Avatar"
              className="w-28 h-28 rounded-full object-cover mb-4 border-4 border-gray-300 dark:border-gray-700"
            />
            {isEditing && (
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="text-sm text-gray-600 dark:text-gray-400"
              />
            )}
          </div>
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Full Name
              </label>
              <input
                type="text"
                name="full_name"
                value={profile.full_name}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="mt-1 block w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Username
              </label>
              <input
                type="text"
                name="username"
                value={profile.username}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="mt-1 block w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                No Telepon
              </label>
              <input
                type="text"
                name="no_telepon"
                value={profile.no_telepon}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="mt-1 block w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="mt-1 block w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
            <div className="flex justify-center mt-6">
              {isEditing ? (
                <button
                  type="button"
                  onClick={updateProfile}
                  className="w-full max-w-xs bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300"
                >
                  Simpan
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="w-full max-w-xs bg-yellow-500 text-white py-3 rounded-lg hover:bg-yellow-600 transition duration-300"
                >
                  Edit
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
