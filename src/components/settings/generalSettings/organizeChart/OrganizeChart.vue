<template>
    <v-bottom-sheet v-model="sheet" inset :max-width="500">
        <v-sheet class="text-center">
            <validationObserver ref="observer" v-slot="{ handleSubmit }">
                <form @submit.prevent="handleSubmit(onSubmit)">
                    <v-card outlined>
                        <v-card-title :class="$store.state.defaultColor + ' ' + $store.state.defaultHeaderTextColor">درج
                            و ویرایش
                        </v-card-title>
                        <v-card-text class="mt-3">
                            <validation-provider
                                    v-slot="{ errors }"
                                    name="عنوان"
                                    rules="required"
                            >
                                <v-text-field
                                        v-model="item.title"
                                        label="عنوان"
                                        clearable
                                        :error-messages="errors"
                                        outlined
                                        shaped
                                ></v-text-field>
                            </validation-provider>
                        </v-card-text>

                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                                    :color="$store.state.defaultColor + ' darken-1'"
                                    text
                                    type="submit"
                            >
                                تایید
                            </v-btn>
                            <v-btn
                                    :color="$store.state.defaultColor + ' darken-1'"
                                    text
                                    @click="closeDialog"
                            >
                                برگشت
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </form>
            </validationObserver>
        </v-sheet>
    </v-bottom-sheet>
</template>

<script>
    import {required} from "vee-validate/dist/rules";
    import {
        extend,
        ValidationObserver,
        ValidationProvider,
        setInteractionMode
    } from "vee-validate";

    setInteractionMode("eager");
    extend("required", {
        ...required,
        message: "{_field_} نمی تواند خالی باشد"
    });
    export default {
        name: "OrganizeChart",
        props: ["sheet", "operation", "item"],
        components: {
            ValidationObserver,
            ValidationProvider
        },
        data() {
            return {
                sheetOperation: this.operation,
            }
        },
        methods: {
            onSubmit() {
                if (this.sheetOperation === "update") {
                    this.closeDialog();
                } else if (this.sheetOperation === "insert") {

                }
            },
            closeDialog() {
                this.$emit("close-sheet", {'sheet': false});
            },
        },
    }
</script>

<style scoped>

</style>