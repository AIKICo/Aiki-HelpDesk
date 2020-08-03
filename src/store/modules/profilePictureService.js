import ProfilePicture from "@/store/models/ProfilePicture";

const profilePictureService={
    namespaced: true,
    state: {},
    mutations: {},
    actions:{
        async addProfilePicture(context, payload) {
            let response = (await ProfilePicture.api().post("/ProfilePicture", payload))
                .response;
            if (response.status === 201) {
                return response;
            } else if (response.data.error) {
                throw new Error("Something is wrong.");
            }
        },
        async editProfilePicture(context, payload) {
            let response = (await ProfilePicture.api().put("/ProfilePicture", payload))
                .response;
            if (response.status === 200) {
                return response;
            } else if (response.data.error) {
                throw new Error("Something is wrong.");
            }
        },
        async patchProfilePicture(context, payload) {
            let response = (
                await ProfilePicture.api().patch(
                    "/ProfilePicture/" + payload.id,
                    payload.patchDoc
                )
            ).response;
            if (response.status === 200) {
                return response;
            } else if (response.data.error) {
                throw new Error("Something is wrong.");
            }
        },
        async deleteProfilePicture(context, payload) {
            let response = (
                await ProfilePicture.api().delete("/ProfilePicture/" + payload, {
                    delete: 42
                })
            ).response;
            if (response.status === 200) {
                return response;
            } else if (response.data.error) {
                throw new Error("Something is wrong.");
            }
        }
    },
    getters:{}
};

export default profilePictureService;
