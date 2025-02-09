const API_BASE_URL = 'http://localhost:8000';

export const api = {
    // Add a new keyword
    async addKeyword(keyword, audioFile) {
        const formData = new FormData();
        formData.append('audio_file', audioFile);

        try {
            const response = await fetch(`${API_BASE_URL}/add_keyword?keyword=${keyword}`, {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.detail || 'Failed to add keyword');
            }

            return await response.json();
        } catch (error) {
            console.error('Error adding keyword:', error);
            throw error;
        }
    },

    // Detect keyword in audio
    async detectKeyword(audioFile, threshold = 0.85) {
        const formData = new FormData();
        formData.append('audio_file', audioFile);

        try {
            console.log('Sending file:', audioFile.name, audioFile.type);  // Debug log
            
            const response = await fetch(`${API_BASE_URL}/detect_keyword?threshold=${threshold}`, {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                const error = await response.json();
                console.error('Server error:', error);  // Debug log
                throw new Error(error.detail || 'Failed to detect keyword');
            }

            const result = await response.json();
            console.log('Detection result:', result);  // Debug log
            return result;
        } catch (error) {
            console.error('Error detecting keyword:', error);
            throw error;
        }
    },

    // List all keywords
    async listKeywords() {
        try {
            const response = await fetch(`${API_BASE_URL}/keywords`);
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.detail || 'Failed to list keywords');
            }
            return await response.json();
        } catch (error) {
            console.error('Error listing keywords:', error);
            throw error;
        }
    },

    // Delete a keyword
    async deleteKeyword(keyword) {
        try {
            const response = await fetch(`${API_BASE_URL}/keywords/${keyword}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.detail || 'Failed to delete keyword');
            }

            return await response.json();
        } catch (error) {
            console.error('Error deleting keyword:', error);
            throw error;
        }
    }
}; 