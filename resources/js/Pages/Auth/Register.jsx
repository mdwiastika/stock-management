import { useForm, usePage } from "@inertiajs/react";

export default function Register() {
    const { roles = [], flash = {} } = usePage().props;
    const { data, setData, post, processing, errors } = useForm({
        username: "",
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        role: roles[0]?.name || "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post("/register");
    };

    return (
        <section className="bg-white dark:bg-dark-2 flex flex-wrap min-h-[100vh]">
            <div className="lg:w-1/2 lg:block hidden">
                <div className="flex items-center flex-col h-full justify-center">
                    <img src="/assets/images/auth/auth-img.png" alt="auth" />
                </div>
            </div>
            <div className="lg:w-1/2 py-8 px-6 flex flex-col justify-center">
                <div className="lg:max-w-[464px] mx-auto w-full">
                    <h4 className="mb-3">Sign Up to your Account</h4>
                    <p className="mb-8 text-secondary-light text-lg">
                        Fill the form below to register.
                    </p>

                    {flash.error && (
                        <div className="text-red-500 mb-4">{flash.error}</div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            placeholder="Username"
                            className="form-control h-[56px] ps-4 mb-4 w-full"
                            value={data.username}
                            onChange={(e) =>
                                setData("username", e.target.value)
                            }
                        />
                        <input
                            type="text"
                            placeholder="Name"
                            className="form-control h-[56px] ps-4 mb-4 w-full"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            className="form-control h-[56px] ps-4 mb-4 w-full"
                            value={data.email}
                            onChange={(e) => setData("email", e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            className="form-control h-[56px] ps-4 mb-4 w-full"
                            value={data.password}
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                        />
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            className="form-control h-[56px] ps-4 mb-4 w-full"
                            value={data.password_confirmation}
                            onChange={(e) =>
                                setData("password_confirmation", e.target.value)
                            }
                        />
                        <select
                            className="form-control h-[56px] ps-4 mb-4 w-full"
                            value={data.role}
                            onChange={(e) => setData("role", e.target.value)}
                        >
                            {roles.map((role) => (
                                <option key={role.id} value={role.name}>
                                    {role.name}
                                </option>
                            ))}
                        </select>
                        <button
                            type="submit"
                            disabled={processing}
                            className="btn btn-primary justify-center text-sm btn-sm px-3 py-4 w-full rounded-xl mt-4"
                        >
                            Sign Up
                        </button>
                        <div className="mt-6 text-center text-sm">
                            <p className="mb-0">
                                Already have an account?{" "}
                                <a
                                    href="/login"
                                    className="text-primary-600 font-semibold hover:underline"
                                >
                                    Sign In
                                </a>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}
