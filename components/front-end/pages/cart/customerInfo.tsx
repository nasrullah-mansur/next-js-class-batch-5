
export default function CustomerInfo() {
    return (
        <div>
            <div className="mx-auto border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
                <div className="mb-6">
                    <h2 className="text-xl font-semibold tracking-tight text-zinc-900">
                        Delivery Address
                    </h2>
                    <p className="mt-1 text-sm text-zinc-500">
                        Enter the customer details and shipping location.
                    </p>
                </div>

                <form className="space-y-5">
                    {/* Customer Name */}
                    <div>
                        <label
                            htmlFor="customer-name"
                            className="block text-sm font-medium text-zinc-700"
                        >
                            Customer Name
                        </label>
                        <input
                            type="text"
                            id="customer-name"
                            name="name"
                            placeholder="e.g. Abdur Rahman"
                            className="mt-1.5 block w-full rounded-lg border border-zinc-300 bg-white px-3.5 py-2.5 text-sm text-zinc-900 placeholder-zinc-400 transition-colors focus:border-zinc-900 focus:ring-2 focus:ring-zinc-900/10 focus:outline-none"
                        />
                    </div>

                    {/* Phone Number */}
                    <div>
                        <label
                            htmlFor="customer-phone"
                            className="block text-sm font-medium text-zinc-700"
                        >
                            Phone Number
                        </label>
                        <input
                            type="tel"
                            id="customer-phone"
                            name="phone"
                            placeholder="e.g. 017XXXXXXXX"
                            className="mt-1.5 block w-full rounded-lg border border-zinc-300 bg-white px-3.5 py-2.5 text-sm text-zinc-900 placeholder-zinc-400 transition-colors focus:border-zinc-900 focus:ring-2 focus:ring-zinc-900/10 focus:outline-none"
                        />
                    </div>

                    {/* District & Thana Grid */}
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                        {/* District (Selectable) */}
                        <div>
                            <label
                                htmlFor="district"
                                className="block text-sm font-medium text-zinc-700"
                            >
                                District
                            </label>
                            <div className="relative mt-1.5">
                                <select
                                    id="district"
                                    name="district"
                                    defaultValue=""
                                    className="block w-full appearance-none rounded-lg border border-zinc-300 bg-white py-2.5 pr-10 pl-3.5 text-sm text-zinc-900 transition-colors focus:border-zinc-900 focus:ring-2 focus:ring-zinc-900/10 focus:outline-none"
                                >
                                    <option value="" disabled>
                                        Select district
                                    </option>
                                    <option value="dhaka">Dhaka</option>
                                    <option value="chattogram">Chattogram</option>
                                    <option value="sylhet">Sylhet</option>
                                    <option value="rajshahi">Rajshahi</option>
                                    <option value="khulna">Khulna</option>
                                    <option value="barishal">Barishal</option>
                                    <option value="rangpur">Rangpur</option>
                                    <option value="mymensingh">Mymensingh</option>
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-zinc-500">
                                    <svg
                                        className="size-4"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* Thana */}
                        <div>
                            <label
                                htmlFor="thana"
                                className="block text-sm font-medium text-zinc-700"
                            >
                                Thana / Upazila
                            </label>
                            <input
                                type="text"
                                id="thana"
                                name="thana"
                                placeholder="e.g. Mirpur"
                                className="mt-1.5 block w-full rounded-lg border border-zinc-300 bg-white px-3.5 py-2.5 text-sm text-zinc-900 placeholder-zinc-400 transition-colors focus:border-zinc-900 focus:ring-2 focus:ring-zinc-900/10 focus:outline-none"
                            />
                        </div>

                        {/* Full Address */}
                        <div className="col-span-2">
                            <label
                                htmlFor="full-address"
                                className="block text-sm font-medium text-zinc-700"
                            >
                                Full Address
                            </label>
                            <textarea

                                id="full-address"
                                name="full-address"
                                className="mt-1.5 block w-full rounded-lg border border-zinc-300 bg-white px-3.5 py-2.5 text-sm text-zinc-900 placeholder-zinc-400 transition-colors focus:border-zinc-900 focus:ring-2 focus:ring-zinc-900/10 focus:outline-none"
                            ></textarea>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2">
                        <button
                            type="submit"
                            className="w-full rounded-lg bg-zinc-900 px-4 py-2.5 text-sm font-medium text-white shadow-xs transition-colors hover:bg-zinc-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900"
                        >
                            Save Address
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
