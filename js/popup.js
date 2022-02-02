
const app = Vue.createApp({

    data() {
        return {
            email: "",
            password: "",
            loading: false,
            rules: {
                email: {
                    required: true,
                    message: 'Please input Activity email',
                    trigger: 'blur',
                },
                password: {
                    required: true,
                    message: 'Please input Activity password',
                    trigger: 'blur',
                }
            }


        }
    },
    methods: {
        handleLogin() {
            this.loading = true;

            setTimeout(() => {
                ElementPlus.ElMessage({
                    message: 'login success.',
                    type: 'success',
                    center: true,
                })
                this.loading = false;
            }, 1000);
        }
    }
})
app.use(ElementPlus);
app.mount('#app')