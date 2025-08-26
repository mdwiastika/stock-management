import { useForm, usePage } from "@inertiajs/react";

export default function Login() {
    const { flash = {} } = usePage().props;
    const { data, setData, post, processing, errors } = useForm({
        username: "",
        password: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post("/login");
    };

    return (
        <section className="bg-white dark:bg-dark-2 flex flex-wrap min-h-[100vh]">
            <div className="lg:w-1/2 lg:block hidden">
                <div className="flex items-center flex-col h-full justify-center">
                    <img src="/assets/images/auth/auth-img.png" alt="" />
                </div>
            </div>
            <div className="lg:w-1/2 py-8 px-6 flex flex-col justify-center">
                <div className="lg:max-w-[464px] mx-auto w-full">
                    <h4 className="mb-3">Sign In to your Account</h4>
                    <p className="mb-8 text-secondary-light text-lg">
                        Welcome back! Please enter your details.
                    </p>

                    {flash.error && (
                        <div className="text-red-500">{flash.error}</div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div className="icon-field mb-4 relative">
                            <input
                                type="text"
                                value={data.username}
                                onChange={(e) =>
                                    setData("username", e.target.value)
                                }
                                className="form-control h-[56px] ps-11 border-neutral-300 bg-neutral-50 dark:bg-dark-2 rounded-xl w-full"
                                placeholder="Username"
                            />
                        </div>
                        <div className="icon-field mb-4 relative">
                            <input
                                type="password"
                                value={data.password}
                                onChange={(e) =>
                                    setData("password", e.target.value)
                                }
                                className="form-control h-[56px] ps-11 border-neutral-300 bg-neutral-50 dark:bg-dark-2 rounded-xl w-full"
                                placeholder="Password"
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={processing}
                            className="btn btn-primary justify-center text-sm btn-sm px-3 py-4 w-full rounded-xl mt-8"
                        >
                            Sign In
                        </button>
                        <div className="mt-8 text-center text-sm">
                            <p className="mb-0">
                                Don't have an account?{" "}
                                <a
                                    href="/register"
                                    className="text-primary-600 font-semibold hover:underline"
                                >
                                    Sign Up
                                </a>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}
