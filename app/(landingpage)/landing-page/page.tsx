import Image from "next/image";
import Link from "next/link";


async function Page() {
    return (
        <div>
            <section className="flex flex-col-reverse lg:flex-row items-center justify-between px-5 md:px-20 py-5">
                <div className="flex flex-col justify-between items-start">
                    <div className="text-indigo-400 text-base font-bold leading-tight mb-5 lg:mb-10">INTRODUCING</div>
                    <div className="text-white text-[50px] md:text-[63px] font-bold leading-tight md:leading-snug mb-5 lg:mb-10">WeaveBoard</div>
                    <div className="text-white text-[15px] font-normal leading-snug">Your digital haven for authentic expression.<br />Dive into a supportive community where you can freely share your thoughts, vent, and connect with like-minded individuals. Embrace the power of unfiltered reflection and discover a space where your voice truly matters. <br /><br />Join WeaveBoard – where thoughts weave connections.</div>
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
            
            <section id="about-section" className="about-section-background">
                <div className="flex flex-col align-start justify-center px-5 md:px-40 py-20">
                    <div className="flex mb-5 lg:mb-10 justify-end">
                        <p className="text-white text-[63px] font-bold leading-tight md:leading-snug">About Us</p>
                    </div>
                    <div className="flex px-40">
                        <p className="text-white text-[22px] font-normal leading-[49.20px]">We're Alexander, Vincent & Rolyn. Welcome to WeaveBoard, where authenticity meets community, and your voice finds its sanctuary.<br></br><br></br>At WeaveBoard, we believe in the power of genuine expression. Our mission is to provide a space where individuals can share their thoughts, vent without judgment, and connect with others on a deeper level. We strive to create a supportive community that values the diversity of perspectives and fosters meaningful connections.<br></br><br></br>Join the WeaveBoard Community: Ready to embark on a journey of self-expression and connection? Join WeaveBoard today and become part of a community where your thoughts weave the fabric of meaningful connections. Together, let's create a space where authenticity reigns supreme.</p>
                    </div>
                </div>
            </section>

            <section id="team-section">

            </section>
        </div>
    )
}

export default Page;