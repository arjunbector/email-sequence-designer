const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

export const sequenceApi = {
  async getAllSequences() {
    const response = await fetch(`${API_BASE_URL}/sequences`);
    if (!response.ok) {
      throw new Error('Failed to fetch sequences');
    }
    return response.json();
  },

  async getSequence(id: string) {
    const response = await fetch(`${API_BASE_URL}/sequences/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch sequence');
    }
    return response.json();
  },

  async createSequence(data: { name: string, nodes: any[], edges: any[] }) {
    const response = await fetch(`${API_BASE_URL}/sequences`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to create sequence');
    }

    return response.json();
  },

  async updateSequence(id: string, data: { name: string, nodes: any[], edges: any[] }) {
    const response = await fetch(`${API_BASE_URL}/sequences/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error('Failed to update sequence');
    }
    return response.json();
  },

  async deleteSequence(id: string) {
    const response = await fetch(`${API_BASE_URL}/sequences/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete sequence');
    }
    return response.json();
  },
};
