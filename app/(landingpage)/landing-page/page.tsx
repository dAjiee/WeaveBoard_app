import Image from "next/image";
import Link from "next/link";


async function Page() {
    return (
        <div className="overflow-x-hidden">
            <section className="flex flex-col-reverse lg:flex-row items-center justify-between px-5 md:px-20 py-5">
                <div className="flex flex-col justify-between items-start">
                    <div className="text-indigo-400 text-base font-bold leading-tight mb-5 lg:mb-10 drop-shadow-lg">INTRODUCING</div>
                    <div className="text-white text-[50px] md:text-[63px] font-bold leading-tight md:leading-snug mb-5 lg:mb-10">WeaveBoard</div>
                    <div className="text-white text-[15px] font-normal leading-normal">Your digital haven for authentic expression.<br />Dive into a supportive community where you can freely share your thoughts, vent, and connect with like-minded individuals. Embrace the power of unfiltered reflection and discover a space where your voice truly matters. <br /><br />Join WeaveBoard – where thoughts weave connections.</div>
                    <div className="flex justify-start mt-14 gap-5">
                        <div className="inline-flex items-center gap-[10px] px-[18px] py-[9px] relative bg-white rounded-[40px]">
                            <Link href="#about-section">
                                <div className="relative w-fit mt-[-1.00px] font-bold text-black text-[14px] text-right tracking-[-0.42px] leading-[22.2px] whitespace-nowrap">
                                    About
                                </div>
                            </Link>
                        </div>
                        <div className="inline-flex items-center gap-[10px] px-[18px] py-[9px] relative border-2 border-black  rounded-[40px]">
                            <Link href="#team-section">
                                <div className="relative w-fit mt-[-1.00px] font-bold text-white text-[14px] text-right tracking-[-0.42px] leading-[22.2px] whitespace-nowrap">
                                    Team
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center items-center">
                    <Image
                        src="/assets/mockup.svg"
                        alt="Mockup Photo"
                        width={938}
                        height={662.07}
                        layout="responsive"
                    />
                </div>
            </section>

            <section id="about-section" className="relative bg-[#7371FF] bg-opacity-50" >
                <div className="flex flex-col align-start justify-center mx-10 sm:mx-20 mt-20 px-0 sm:px-5 lg:px-20 py-20">
                    <div className="flex mb-5 lg:mb-10 justify-end">
                        <p className="text-white text-[30px] sm:text-[50px] md:text-[63px] font-bold leading-tight md:leading-snug">About Us</p>
                    </div>
                    <div className="flex px-5 sm:px-10">
                        <p className="text-white text:[12px] sm:text-[18px] md:text-[22px] font-normal leading-[40px] sm:leading-[49.20px]">We're Alexander, Vincent & Rolyn. Welcome to WeaveBoard, where authenticity meets community, and your voice finds its sanctuary.<br></br><br></br>At WeaveBoard, we believe in the power of genuine expression. Our mission is to provide a space where individuals can share their thoughts, vent without judgment, and connect with others on a deeper level. We strive to create a supportive community that values the diversity of perspectives and fosters meaningful connections.<br></br><br></br>Join the WeaveBoard Community: Ready to embark on a journey of self-expression and connection? Join WeaveBoard today and become part of a community where your thoughts weave the fabric of meaningful connections. Together, let's create a space where authenticity reigns supreme.</p>
                    </div>
                </div>
            </section>

            {/* Padding top should be 40 */}
            <section id="team-section" className="relative mb-40">
                <div className="custom-shape-divider-top-1703392949 opacity-50">
                    <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                        <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" className="shape-fill"></path>
                        <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" className="shape-fill"></path>
                        <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" className="shape-fill"></path>
                    </svg>
                </div>
            </section>

            <section className="flex flex-col align-center justify-between px-5 md:px-20 py-5">
                <div className="relative flex flex-col align-start justify-center px-2 sm:px-5 lg:px-20">
                    <div className="flex flex-col mb-5 lg:mb-10 justify-start">
                        <p className="text-white text-[30px] sm:text-[50px] md:text-[63px] font-bold leading-tight md:leading-snug">Meet our Team</p>
                        <p className="text-white text:[12px] sm:text-[18px] md:text-[22px] py-10">Meet our dynamic team at WeaveBoard.</p>
                    </div>
                </div>

                <div className="flex flex-col justify-center gap-5 px-2 sm:px-5 lg:px-20 mb-10 lg:mb-20">
                    <div className="flex flex-col lg:flex-row border border-white justify-between items-center px-5 lg:px-20 py-10 gap-10">
                        <div className="flex lg:flex-grow">
                            <Image
                                src="/assets/alex.svg"
                                alt="Alex Photo"
                                width={530}
                                height={530}
                                layout="responsive"
                            />
                        </div>
                        <div className="flex flex-grow flex-col">
                            <div className=" text-white text-lg font-semibold leading-[27px] mb-2">Project Lead and System Developer</div>
                            <div className="text-white text-[32px] font-bold leading-10 mb-2">Alexander Vaugn Villasis</div>
                            <div className="text-white text-base font-normal leading-tight">Meet our Project Lead and System Developer—an architect of the digital backbone that powers WeaveBoard. With expertise in coding, problem-solving, and system optimization, they ensure the seamless functionality of our platform, providing a robust and reliable experience for every user.</div>
                        </div>
                    </div>

                    <div className="flex flex-col lg:flex-row-reverse border border-white justify-between items-center px-5 lg:px-20 py-10 gap-10">
                        <div className="flex lg:flex-grow">
                            <Image
                                src="/assets/vincent.svg"
                                alt="Alex Photo"
                                width={530}
                                height={530}
                                layout="responsive"
                            />
                        </div>
                        <div className="flex flex-grow flex-col">
                            <div className=" text-white text-lg font-semibold leading-[27px] mb-2">UI/UX and Front End Developer</div>
                            <div className="text-white text-[32px] font-bold leading-10 mb-2">Vincent Dialing</div>
                            <div className="text-white text-base font-normal leading-tight">Say hello to our UI/UX and Front End  Developer, the creative mind behind the user interface and experience of WeaveBoard. Through a keen eye for design and an understanding of user behavior, they craft an intuitive and visually engaging platform, enhancing user interaction and satisfaction.</div>
                        </div>
                    </div>

                    <div className="flex flex-col lg:flex-row border border-white justify-between items-center px-5 lg:px-20 py-10 gap-10">
                        <div className="flex lg:flex-grow">
                            <Image
                                src="/assets/rolyn.svg"
                                alt="Alex Photo"
                                width={530}
                                height={530}
                                layout="responsive"
                            />
                        </div>
                        <div className="flex flex-grow flex-col">
                            <div className=" text-white text-lg font-semibold leading-[27px] mb-2">Documentation and Resource</div>
                            <div className="text-white text-[32px] font-bold leading-10 mb-2">Rolyn Morales</div>
                            <div className="text-white text-base font-normal leading-tight">Introducing our Documentation and Resource Specialist—a meticulous curator of information and support for our community. They work diligently to provide comprehensive documentation, valuable resources, and assistance, ensuring that our users have access to the knowledge they need to make the most of their WeaveBoard experience.</div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Page;