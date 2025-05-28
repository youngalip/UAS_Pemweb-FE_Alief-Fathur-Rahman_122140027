import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories, addCategory, updateCategory, deleteCategory } from '../../features/admin/adminSlice';
import LoadingSpinner from '../common/LoadingSpinner';

const CategoryManagement = () => {
  const dispatch = useDispatch();
  const { categories, status, error } = useSelector(state => state.admin);
  const [newCategory, setNewCategory] = useState({ name: '', description: '' });
  const [editingCategory, setEditingCategory] = useState(null);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleAddCategory = (e) => {
    e.preventDefault();
    dispatch(addCategory(newCategory));
    setNewCategory({ name: '', description: '' });
  };

  const handleUpdateCategory = (e) => {
    e.preventDefault();
    dispatch(updateCategory(editingCategory));
    setEditingCategory(null);
  };

  const handleDeleteCategory = (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus kategori ini?')) {
      dispatch(deleteCategory(id));
    }
  };

  const startEditing = (category) => {
    setEditingCategory({ ...category });
  };

  const cancelEditing = () => {
    setEditingCategory(null);
  };

  if (status === 'loading') {
    return <LoadingSpinner />;
  }

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Manajemen Kategori</h2>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-md mb-6">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Form untuk menambah kategori baru */}
        <div className="bg-gray-50 p-4 rounded-md">
          <h3 className="text-lg font-medium text-gray-800 mb-4">
            {editingCategory ? 'Edit Kategori' : 'Tambah Kategori Baru'}
          </h3>
          <form onSubmit={editingCategory ? handleUpdateCategory : handleAddCategory}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Nama Kategori
              </label>
              <input
                type="text"
                id="name"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                value={editingCategory ? editingCategory.name : newCategory.name}
                onChange={(e) => 
                  editingCategory 
                    ? setEditingCategory({ ...editingCategory, name: e.target.value }) 
                    : setNewCategory({ ...newCategory, name: e.target.value })
                }
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Deskripsi
              </label>
              <textarea
                id="description"
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                value={editingCategory ? editingCategory.description : newCategory.description}
                onChange={(e) => 
                  editingCategory 
                    ? setEditingCategory({ ...editingCategory, description: e.target.value }) 
                    : setNewCategory({ ...newCategory, description: e.target.value })
                }
              />
            </div>
            <div className="flex justify-end space-x-2">
              {editingCategory && (
                <button
                  type="button"
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-md text-sm font-medium"
                  onClick={cancelEditing}
                >
                  Batal
                </button>
              )}
              <button
                type="submit"
                className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                {editingCategory ? 'Perbarui' : 'Tambah'}
              </button>
            </div>
          </form>
        </div>

        {/* Daftar kategori */}
        <div>
          <h3 className="text-lg font-medium text-gray-800 mb-4">Daftar Kategori</h3>
          {categories.length === 0 ? (
            <p className="text-gray-500">Belum ada kategori.</p>
          ) : (
            <ul className="divide-y divide-gray-200">
              {categories.map((category) => (
                <li key={category.id} className="py-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">{category.name}</h4>
                      <p className="text-sm text-gray-500">{category.description}</p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => startEditing(category)}
                        className="text-indigo-600 hover:text-indigo-900 text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteCategory(category.id)}
                        className="text-red-600 hover:text-red-900 text-sm"
                      >
                        Hapus
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryManagement;
