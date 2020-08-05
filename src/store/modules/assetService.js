import Asset from "../models/Asset";
import AssetsView from "../models/AssetsView";
import axios from "axios"

const assetService = {
    namespaced: true,
    state: {
        current: [],
        allAssets: [],
        pagination: {
            descending: true,
            page: 1,
            rowsPerPage: 20,
            sortBy: "fat",
            totalItems: 0,
            rowsPerPageItems: [10, 20, 30, 40, 50],
        },
        totalItems: 0,
        loader: false,
    },
    mutations: {
        SET_LOADER(state, payload) {
            state.loader = payload;
        },
        SET_CURRENT(state, payload) {
            state.current = payload;
        },
        SET_TOTAL(state, paylod) {
            state.totalItems = parseInt(paylod);
            state.pagination.totalItems = paylod;
        },
    },
    actions: {
        async loadPagingAssets({
                                   state,
                                   commit
                               }, {
                                   rows,
                                   page
                               }) {
            commit("SET_LOADER", true);
            var start = parseInt(rows) * (parseInt(page) - 1);
            var end = start + parseInt(rows);
            var list = state.allAssets.slice(start, end);
            if (list.length > 0) {
                commit("SET_CURRENT", list);
                commit("SET_LOADER", false);
            } else {
                let response = (await Asset.api().get(`/Assets/${rows}/${page}`)).response;
                if (response.status === 200) {
                    commit("SET_TOTAL", response.headers["x-total-count"]);
                    commit("SET_CURRENT", response.data);
                    commit("SET_LOADER", false);
                    return response;
                } else if (response.data.error) {
                    throw new Error("Something is wrong.");
                }
            }
        },
        async loadAssets({
                             commit
                         }) {
            let response = (await Asset.api().get("/Assets")).response;
            if (response.status === 200) {
                commit("SET_TOTAL", response.headers["x-total-count"]);
                commit("SET_CURRENT", response.data);
                commit("SET_LOADER", false);
            } else if (response.data.error) {
                throw new Error("Something is wrong.");
            }
        },
        async loadAssetsView({
                                 commit
                             }) {
            let response = (await AssetsView.api().get("/AssetsView")).response;
            if (response.status === 200) {
                commit("SET_TOTAL", response.headers["x-total-count"]);
                commit("SET_CURRENT", response.data);
                commit("SET_LOADER", false);
                return response;
            } else if (response.data.error) {
                throw new Error("Something is wrong.");
            }
        },
        async loadAssetsViewByCompanyId({commit}, payload) {
            let response = (await AssetsView.api().get("/AssetsView/GetByCustomerId/" + payload)).response;
            if (response.status === 200) {
                commit("SET_TOTAL", response.headers["x-total-count"]);
                commit("SET_CURRENT", response.data);
                commit("SET_LOADER", false);
                return response;
            } else if (response.data.error) {
                throw new Error("Something is wrong.");
            }
        },
        async loadAsset(state, payload) {
            let response = (await Asset.api().get("/Assets/" + payload)).response;
            if (response.status === 200) {
                return response;
            } else if (response.data.error) {
                throw new Error("Something is wrong.");
            }
        },
        async addAsset(context, payload) {
            let response = (await Asset.api().post("/Assets", payload))
                .response;
            if (response.status === 201) {
                return response;
            } else if (response.data.error) {
                throw new Error("Something is wrong.");
            }
        },
        async editAsset(context, payload) {
            let response = (await Asset.api().put("/Assets", payload)).response;
            if (response.status === 200) {
                return response;
            } else if (response.data.error) {
                throw new Error("Something is wrong.");
            }
        },
        async patchAsset(context, payload) {
            let response = (
                await Asset.api().patch("/Assets/" + payload.id, payload.patchDoc)
            ).response;
            if (response.status === 200) {
                return response;
            } else if (response.data.error) {
                throw new Error("Something is wrong.");
            }
        },
        async deleteAsset(context, payload) {
            let response = (
                await Asset.api().delete("/Assets/" + payload.id, {
                    delete: 42
                })
            ).response;
            if (response.status === 200) {
                return response;
            } else if (response.data.error) {
                throw new Error("Something is wrong.");
            }
        },
        async isAssetExists(context, payload) {
            if (payload===null) return true;
            let response = await axios.get("/Assets/isAssetExists/" + payload);
            return response;
        },
    },
    getters: {
        getAssets: () => Asset.all(),
    }
};

export default assetService;
