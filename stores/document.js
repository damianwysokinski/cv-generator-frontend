import { defineStore } from 'pinia';
import { useToastStore } from "~/stores/toast.js";
export const useDocumentStore = defineStore('document', {
    state: () => ({
        documents: [],
        document: null
    }),
    actions: {
        async getDocuments() {
            try {
                const { data } = await useAsyncGql({
                    operation: 'getDocuments',
                    variables: { },
                });

                this.documents = data?.value?.documents;

                return this.documents;
            } catch (error) {
                console.error(error);
            }
        },
        async getDocument(id) {
            try {
                const { data } = await useAsyncGql({
                  operation: 'getDocument',
                  variables: { id },
                });

                this.document = data?.value?.document;
            } catch (error) {
                console.error(error);
            }
        },
        async createDocument(userId) {
            try {
                const { createDocument } = await GqlCreateDocument({
                    userId
                });

                this.document = createDocument;
                this.documents.push(createDocument);

                return this.document;
            } catch (error) {
                console.error(error);
            }
        },
        async updateDocument(id, userId, formData) {
            try {
                const { updateDocument } = await GqlUpdateDocument({
                    ...formData,
                    id,
                    userId
                });

                this.document = updateDocument;
            } catch (error) {
                console.error(error);
            }
        },
        async removeDocument(id) {
            const toastStore = useToastStore();

            try {
                await GqlRemoveDocument({ id });

                this.documents = this.documents.filter(doc => doc.id !== id);
                toastStore.addToast('Document removed successfully', 'success');
            } catch (error) {
                console.error(error);
                toastStore.addToast('Failed to remove document', 'error');
            }
        }
    },
});
