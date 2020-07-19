<template v-slot:items="props">
    <v-container>
        <v-main>
            <v-row>
                <v-col>
                    <v-alert
                            prominent
                            type="success"
                    >
                        <v-row align="center">
                            <v-col class="grow">ثبت نام شما با موفقیت صورت پذیرفته و کلمه عبور به ایمیل شما ارسال گردید.</v-col>
                            <v-col class="shrink">
                                <v-btn @click="$router.push('/login')" :color="$store.state.defaultColor">ورود به سامانه</v-btn>
                            </v-col>
                        </v-row>
                    </v-alert>
                </v-col>
            </v-row>
        </v-main>
    </v-container>
</template>

<script>
    export default {
        name: "registerUserConfirm",
    }
</script>

<style scoped>

</style>