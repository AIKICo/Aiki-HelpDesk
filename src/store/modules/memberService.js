import Member from "../models/Member";

const memberService = {
    namespaced: true,
    state: {},
    mutations: {},
    actions: {
        async loadMembers() {
            let response = (await Member.api().get("/Members")).response;
            if (response.status === 200) {
                return response;
            } else if (response.data.error) {
                throw new Error("Something is wrong.");
            }
        },
        async addMember(context, payload) {
            let response = (await Member.api().post("/Members", payload))
                .response;
            if (response.status === 201) {
                return response;
            } else if (response.data.error) {
                throw new Error("Something is wrong.");
            }
        },
        async editMember(context, payload) {
            let response = (await Member.api().put("/Members", payload)).response;
            if (response.status === 200) {
                return response;
            } else if (response.data.error) {
                throw new Error("Something is wrong.");
            }
        },
        async patchMember(context, payload) {
            let response = (
                await Member.api().patch("/Members/" + payload.id, payload.patchDoc)
            ).response;
            if (response.status === 200) {
                return response;
            } else if (response.data.error) {
                throw new Error("Something is wrong.");
            }
        },
        async deleteMember(context, payload) {
            let response = (
                await Member.api().delete("/Members/" + payload.id, {delete: 42})
            ).response;
            if (response.status === 200) {
                return response;
            } else if (response.data.error) {
                throw new Error("Something is wrong.");
            }
        }
    },
    getters: {
        getMembers: () => Member.all(),
        getMember: () => memberId => Member.find(memberId),
    }
};

export default memberService;
