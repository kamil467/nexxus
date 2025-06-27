import React, { useState, useEffect } from 'react';
import { WorkItem, RelatedItem } from '../api/supabase';
import { supabase } from '../api/supabase';

interface WorkItemAdminProps {
  workItems?: WorkItem[]; // Made optional since we're now using event-based communication
  onWorkItemsChange: () => void;
  isAdmin: boolean;
}

const WorkItemAdmin: React.FC<WorkItemAdminProps> = ({ onWorkItemsChange, isAdmin }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<WorkItem | null>(null);
  const [formMode, setFormMode] = useState<'add' | 'edit'>('add');
  
  // Form tabs
  const [activeTab, setActiveTab] = useState<'basic' | 'details' | 'related'>('basic');
  
  // Related Items state
  const [relatedItems, setRelatedItems] = useState<RelatedItem[]>([]);
  const [isAddingRelatedItem, setIsAddingRelatedItem] = useState(false);
  const [editingRelatedItemIndex, setEditingRelatedItemIndex] = useState<number | null>(null);
  const [relatedItemForm, setRelatedItemForm] = useState<Partial<RelatedItem>>({
    type: 'image',
    src: '',
    videoId: '',
    title: '',
    description: ''
  });
  
  // Form state
  // Add effect for event listener
  useEffect(() => {
    // Add event listener for the custom editWorkItem event
    const handleEditWorkItem = (event: Event) => {
      const customEvent = event as CustomEvent;
      const { item } = customEvent.detail;
      console.log('Received editWorkItem event with item:', item);
      if (item) {
        openEditModal(item);
      }
    };
    
    // Add the event listener to the parent container
    const container = document.querySelector('.admin-panel-container');
    if (container) {
      container.addEventListener('editWorkItem', handleEditWorkItem);
    }
    
    return () => {
      // Clean up event listeners
      const container = document.querySelector('.admin-panel-container');
      if (container) {
        container.removeEventListener('editWorkItem', handleEditWorkItem);
      }
    };
  }, []);
  
  const [formData, setFormData] = useState<Partial<WorkItem>>({
    title: '',
    description: '',
    type: 'image',
    image: '',
    videoId: '',
    hId: '',
    cols: 1,
    rows: 1,
    slug: '',
    relatedItems: [],
    // WorkDetails fields
    overview: '',
    capability: '',
    team: ''
  });

  // Related Items functions
  const addRelatedItem = () => {
    if (relatedItemForm.title && (relatedItemForm.src || relatedItemForm.videoId)) {
      const newItem: RelatedItem = {
        ...relatedItemForm,
        id: Date.now() // Temporary ID for frontend management
      } as RelatedItem;
      
      setRelatedItems([...relatedItems, newItem]);
      resetRelatedItemForm();
      setIsAddingRelatedItem(false);
    }
  };

  const editRelatedItem = (index: number) => {
    const item = relatedItems[index];
    setRelatedItemForm(item);
    setEditingRelatedItemIndex(index);
    setIsAddingRelatedItem(true);
  };

  const updateRelatedItem = () => {
    if (editingRelatedItemIndex !== null && relatedItemForm.title && (relatedItemForm.src || relatedItemForm.videoId)) {
      const updatedItems = [...relatedItems];
      updatedItems[editingRelatedItemIndex] = { ...relatedItemForm } as RelatedItem;
      setRelatedItems(updatedItems);
      resetRelatedItemForm();
      setIsAddingRelatedItem(false);
      setEditingRelatedItemIndex(null);
    }
  };

  const removeRelatedItem = (index: number) => {
    const updatedItems = relatedItems.filter((_, i) => i !== index);
    setRelatedItems(updatedItems);
  };

  const resetRelatedItemForm = () => {
    setRelatedItemForm({
      type: 'image',
      src: '',
      videoId: '',
      title: '',
      description: ''
    });
  };

  const handleRelatedItemInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setRelatedItemForm({
      ...relatedItemForm,
      [name]: value
    });
  };

  const openAddModal = () => {
    setFormData({
      title: '',
      description: '',
      type: 'image',
      image: '',
      videoId: '',
      hId: '',
      cols: 1,
      rows: 1,
      slug: '',
      relatedItems: [],
      overview: '',
      capability: '',
      team: ''
    });
    setRelatedItems([]);
    resetRelatedItemForm();
    setFormMode('add');
    setIsModalOpen(true);
  };

  const openEditModal = (item: WorkItem) => {
    console.log('openEditModal called with item:', item);
    setCurrentItem(item);
    setFormData({
      title: item.title,
      description: item.description,
      type: item.type,
      image: item.image || '',
      videoId: item.videoId || '',
      hId: item.hId || '',
      cols: typeof item.cols === 'string' ? parseInt(item.cols as string) : item.cols,
      rows: typeof item.rows === 'string' ? parseInt(item.rows as string) : item.rows,
      slug: item.slug,
      relatedItems: item.relatedItems || [],
      overview: item.overview || '',
      capability: item.capability || '',
      team: item.team || ''
    });
    
    // Set related items from the work item
    setRelatedItems(item.relatedItems || []);
    resetRelatedItemForm();
    
    console.log('Opening edit modal with data:', item);
    console.log('Parsed cols and rows:', {
      cols: typeof item.cols === 'string' ? parseInt(item.cols as string) : item.cols,
      rows: typeof item.rows === 'string' ? parseInt(item.rows as string) : item.rows
    });
    setFormMode('edit');
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentItem(null);
    setRelatedItems([]);
    resetRelatedItemForm();
    setIsAddingRelatedItem(false);
    setEditingRelatedItemIndex(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Handle numeric values properly
    if (name === 'cols' || name === 'rows') {
      const numValue = parseInt(value) || 1; // Default to 1 if parsing fails
      setFormData({
        ...formData,
        [name]: numValue
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  // Debug function to check if Supabase is working
  const testSupabaseConnection = async () => {
    try {
      console.log('Testing Supabase connection...');
      const { data, error } = await supabase
        .from('work_items')
        .select('id')
        .limit(1);
      
      if (error) {
        console.error('Supabase connection test failed:', error);
      } else {
        console.log('Supabase connection test succeeded:', data);
      }
    } catch (err) {
      console.error('Supabase connection test exception:', err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted, mode:', formMode);
    console.log('Current item:', currentItem);
    
    // Test Supabase connection
    await testSupabaseConnection();
    
    // Ensure cols and rows are numbers
    const finalFormData = {
      ...formData,
      cols: Number(formData.cols) || 1,
      rows: Number(formData.rows) || 1,
      relatedItems: relatedItems // Include related items from state
    };
    
    // Force cols and rows to be numbers for TypeScript
    finalFormData.cols = Number(finalFormData.cols);
    finalFormData.rows = Number(finalFormData.rows);
    
    console.log('Submitting form data:', finalFormData);
    console.log('Related items being submitted:', relatedItems);
    
    try {
      if (formMode === 'add') {
        // Create new work item
        const { data, error } = await supabase
          .from('work_items')
          .insert([finalFormData])
          .select();
          
        if (error) throw error;
        console.log('Added work item:', data);
      } else if (formMode === 'edit' && currentItem) {
        try {
          // Update existing work item with ID included
          const updateData = {
            ...finalFormData,
            id: currentItem.id // Include the ID in the update data
          };
          
          // Remove any undefined or null values that might cause issues
          Object.keys(updateData).forEach(key => {
            const typedKey = key as keyof typeof updateData;
            if (updateData[typedKey] === undefined || updateData[typedKey] === null) {
              delete updateData[typedKey];
            }
          });
          
          console.log('Updating work item with data:', updateData);
          
          // First try a simple test query to ensure Supabase is working
          const testQuery = await supabase
            .from('work_items')
            .select('id')
            .eq('id', currentItem.id)
            .single();
            
          console.log('Test query result:', testQuery);
          
          if (testQuery.error) {
            console.error('Test query failed:', testQuery.error);
            throw testQuery.error;
          }
          
          // Now try the actual update
          const { data, error } = await supabase
            .from('work_items')
            .update(updateData)
            .eq('id', currentItem.id)
            .select();
            
          if (error) {
            console.error('Update failed with error:', error);
            throw error;
          }
          
          console.log('Updated work item:', data);
        } catch (updateError) {
          console.error('Error in update operation:', updateError);
          throw updateError;
        }
      }
      
      // Refresh work items list
      onWorkItemsChange();
      closeModal();
    } catch (error) {
      console.error('Error saving work item:', error);
      alert('Failed to save work item. See console for details.');
    }
  };

  // handleDelete function has been moved to the Test.tsx component
  // where it's directly integrated with the masonry grid items

  if (!isAdmin) return null;

  return (
    <div className="work-item-admin mb-8">
      <div className="admin-header flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Work Items Admin</h2>
        <button 
          onClick={openAddModal}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          Add Work Item
        </button>
      </div>
      
      {/* Work items are now managed directly in the masonry grid */}
      <p className="text-gray-600 italic mt-2 mb-4">
        Edit and delete controls are now available directly on each work item in the grid.
      </p>
      
      {/* Modal for Add/Edit */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">{formMode === 'add' ? 'Add New Work Item' : 'Edit Work Item'}</h3>
              <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            
            <form onSubmit={(e) => {
              console.log('Form submit event triggered');
              handleSubmit(e);
            }} className="space-y-4">
              {/* Form Tabs */}
              <div className="flex border-b border-gray-200 mb-6">
                <button
                  type="button"
                  className={`py-2 px-4 ${activeTab === 'basic' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                  onClick={() => setActiveTab('basic')}
                >
                  Basic Information
                </button>
                <button
                  type="button"
                  className={`py-2 px-4 ${activeTab === 'details' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                  onClick={() => setActiveTab('details')}
                >
                  Details Content
                </button>
                <button
                  type="button"
                  className={`py-2 px-4 ${activeTab === 'related' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                  onClick={() => setActiveTab('related')}
                >
                  Related Items
                </button>
              </div>
              
              {/* Basic Information Tab */}
              {activeTab === 'basic' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    rows={3}
                    required
                  ></textarea>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                  >
                    <option value="image">Image</option>
                    <option value="vimeo">Vimeo</option>
                    <option value="youtube">YouTube</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Slug</label>
                  <input
                    type="text"
                    name="slug"
                    value={formData.slug}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                
                {formData.type === 'image' && (
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                    <input
                      type="url"
                      name="image"
                      value={formData.image}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      required={formData.type === 'image'}
                    />
                  </div>
                )}
                
                {(formData.type === 'vimeo' || formData.type === 'youtube') && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Video ID</label>
                    <input
                      type="text"
                      name="videoId"
                      value={formData.videoId}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      required={formData.type === 'vimeo' || formData.type === 'youtube'}
                    />
                  </div>
                )}
                
                {formData.type === 'vimeo' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Vimeo Hash ID</label>
                    <input
                      type="text"
                      name="hId"
                      value={formData.hId}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      required={formData.type === 'vimeo'}
                    />
                  </div>
                )}
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Columns</label>
                  <input
                    type="number"
                    name="cols"
                    value={formData.cols}
                    onChange={handleInputChange}
                    min="1"
                    max="3"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Rows</label>
                  <input
                    type="number"
                    name="rows"
                    value={formData.rows}
                    onChange={handleInputChange}
                    min="1"
                    max="3"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
              </div>
              )}
              
              {/* Details Content Tab */}
              {activeTab === 'details' && (
                <div className="grid grid-cols-1 gap-4">
                  <div className="col-span-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Overview</label>
                    <textarea
                      name="overview"
                      value={formData.overview}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      rows={4}
                    ></textarea>
                  </div>
                  
                  <div className="col-span-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Capability</label>
                    <textarea
                      name="capability"
                      value={formData.capability}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      rows={4}
                    ></textarea>
                  </div>
                  
                  <div className="col-span-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Team</label>
                    <textarea
                      name="team"
                      value={formData.team}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      rows={4}
                    ></textarea>
                  </div>
                </div>
              )}
              
              {/* Related Items Tab */}
              {activeTab === 'related' && (
                <div className="grid grid-cols-1 gap-4">
                  <div className="col-span-1">
                    <h3 className="text-lg font-bold mb-2">Related Items</h3>
                    <ul>
                      {relatedItems.map((item, index) => (
                        <li key={index} className="mb-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm">{item.title}</span>
                            <div className="flex space-x-2">
                              <button
                                type="button"
                                onClick={() => editRelatedItem(index)}
                                className="text-gray-500 hover:text-gray-700"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                                </svg>
                              </button>
                              <button
                                type="button"
                                onClick={() => removeRelatedItem(index)}
                                className="text-gray-500 hover:text-gray-700"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <path d="M21 4H8l-7 8 7 8h13a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z"></path>
                                  <line x1="18" y1="9" x2="12" y2="15"></line>
                                  <line x1="12" y1="9" x2="18" y2="15"></line>
                                </svg>
                              </button>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                    {isAddingRelatedItem ? (
                      <div className="mt-4">
                        <h4 className="text-sm font-bold mb-2">Add New Related Item</h4>
                        <div className="grid grid-cols-1 gap-2">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                            <input
                              type="text"
                              name="title"
                              value={relatedItemForm.title}
                              onChange={handleRelatedItemInputChange}
                              className="w-full p-2 border border-gray-300 rounded-md"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                            <select
                              name="type"
                              value={relatedItemForm.type}
                              onChange={handleRelatedItemInputChange}
                              className="w-full p-2 border border-gray-300 rounded-md"
                              required
                            >
                              <option value="image">Image</option>
                              <option value="vimeo">Vimeo</option>
                              <option value="youtube">YouTube</option>
                            </select>
                          </div>
                          {relatedItemForm.type === 'image' && (
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                              <input
                                type="url"
                                name="src"
                                value={relatedItemForm.src}
                                onChange={handleRelatedItemInputChange}
                                className="w-full p-2 border border-gray-300 rounded-md"
                                required={relatedItemForm.type === 'image'}
                              />
                            </div>
                          )}
                          {(relatedItemForm.type === 'vimeo' || relatedItemForm.type === 'youtube') && (
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Video ID</label>
                              <input
                                type="text"
                                name="videoId"
                                value={relatedItemForm.videoId}
                                onChange={handleRelatedItemInputChange}
                                className="w-full p-2 border border-gray-300 rounded-md"
                                required={relatedItemForm.type === 'vimeo' || relatedItemForm.type === 'youtube'}
                              />
                            </div>
                          )}
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                            <textarea
                              name="description"
                              value={relatedItemForm.description}
                              onChange={handleRelatedItemInputChange}
                              className="w-full p-2 border border-gray-300 rounded-md"
                              rows={2}
                            ></textarea>
                          </div>
                          <div className="flex justify-end">
                            <button
                              type="button"
                              onClick={editingRelatedItemIndex !== null ? updateRelatedItem : addRelatedItem}
                              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                            >
                              {editingRelatedItemIndex !== null ? 'Update' : 'Add'}
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                setIsAddingRelatedItem(false);
                                resetRelatedItemForm();
                              }}
                              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 ml-2"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setIsAddingRelatedItem(true)}
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 mt-4"
                      >
                        Add Related Item
                      </button>
                    )}
                  </div>
                </div>
              )}
              
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                >
                  Cancel
                </button>
                {formMode === 'add' ? (
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                  >
                    Add Work Item
                  </button>
                ) : (
                  <button
                    type="button" /* Changed to button type for direct handling */
                    onClick={async () => {
                      console.log('Direct update button clicked');
                      
                      // Create a direct update function
                      if (currentItem) {
                        try {
                          // Ensure cols and rows are numbers
                          const finalFormData = {
                            ...formData,
                            cols: Number(formData.cols) || 1,
                            rows: Number(formData.rows) || 1
                          };
                          
                          // Force cols and rows to be numbers for TypeScript
                          finalFormData.cols = Number(finalFormData.cols);
                          finalFormData.rows = Number(finalFormData.rows);
                          
                          console.log('Directly updating with data:', finalFormData);
                          
                          // Test Supabase connection
                          await testSupabaseConnection();
                          
                          // Log the current item ID we're updating
                          console.log('Updating item with ID:', currentItem.id);
                          
                          // First check if the item exists
                          const checkItem = await supabase
                            .from('work_items')
                            .select('id')
                            .eq('id', currentItem.id)
                            .single();
                            
                          console.log('Check item result:', checkItem);
                          
                          if (checkItem.error) {
                            console.error('Item not found:', checkItem.error);
                            throw new Error(`Item with ID ${currentItem.id} not found`);
                          }
                          
                          // Create a clean update object without any undefined or null values
                          const cleanUpdateData: Record<string, any> = {};
                          
                          // Only include defined fields
                          if (finalFormData.title) cleanUpdateData.title = finalFormData.title;
                          if (finalFormData.description) cleanUpdateData.description = finalFormData.description;
                          if (finalFormData.type) cleanUpdateData.type = finalFormData.type;
                          if (finalFormData.image !== undefined) cleanUpdateData.image = finalFormData.image;
                          if (finalFormData.videoId !== undefined) cleanUpdateData.videoId = finalFormData.videoId;
                          if (finalFormData.hId !== undefined) cleanUpdateData.hId = finalFormData.hId;
                          if (finalFormData.slug) cleanUpdateData.slug = finalFormData.slug;
                          if (finalFormData.overview !== undefined) cleanUpdateData.overview = finalFormData.overview;
                          if (finalFormData.capability !== undefined) cleanUpdateData.capability = finalFormData.capability;
                          if (finalFormData.team !== undefined) cleanUpdateData.team = finalFormData.team;
                          
                          // Always include cols and rows as they should be numbers
                          cleanUpdateData.cols = finalFormData.cols;
                          cleanUpdateData.rows = finalFormData.rows;
                          
                          console.log('Clean update data:', cleanUpdateData);
                          
                          // Update directly without form submission
                          const { data, error } = await supabase
                            .from('work_items')
                            .update(cleanUpdateData)
                            .eq('id', currentItem.id)
                            .select();
                            
                          if (error) {
                            console.error('Direct update error:', error);
                            alert('Failed to update work item: ' + error.message);
                          } else {
                            console.log('Direct update successful:', data);
                            onWorkItemsChange();
                            closeModal();
                          }
                        } catch (err) {
                          console.error('Exception in direct update:', err);
                          alert('Exception occurred during update');
                        }
                      } else {
                        console.error('Cannot update: currentItem is null');
                      }
                    }}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                  >
                    Save Changes
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkItemAdmin;
