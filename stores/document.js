import { defineStore } from 'pinia';
import { useToastStore } from "~/stores/toast.js";

export const useDocumentStore = defineStore('document', {
    state: () => ({
        documents: [],
        document: null,
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
            const toastStore = useToastStore();

            try {
                const result = await GqlGetDocument({id});

                this.document = result.document;

                return this.document;
            } catch (error) {
                toastStore.addToast(`Problem loading the document. ${error.gqlErrors[0]?.message}.`, 'error');

                return error;
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
        async updateDocument() {
            try {
                console.log(this.document)
                const { updateDocument } = await GqlUpdateDocument({
                    ...this.document,
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
