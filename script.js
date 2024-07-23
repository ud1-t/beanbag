

function locomotiveAnimation() {
    gsap.registerPlugin(ScrollTrigger);

    // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

    const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true
    });
    // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
    locoScroll.on("scroll", ScrollTrigger.update);

    // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
    ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
        return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
        return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
    });


    // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

    // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
    ScrollTrigger.refresh();


}
locomotiveAnimation()




const project = document.querySelector(".project")
const projects = document.querySelector(".projects")
const preview = document.querySelector(".preview")
const previewImg = document.querySelector(".preview-img")

let isInside = false

const bgPositions = {
    p1: "0 0",
    p2: "0 25%",
    p3: "0 50%",
    p4: "0 75%",
    p5: "0 100%",
}

const moveStuff = (e) => {
    const mouseInside = isMouseInsideContainer(e)

    if(mouseInside !== isInside) {
        isInside = mouseInside
        if(isInside) {
            gsap.to(preview, 0.3, {
                scale: 1,
            })
        }
        else {
            gsap.to(preview, 0.3, {
                scale: 0,
            })
        }
    }
}

const moveProject = (e) => {
    const previewRect = preview.getBoundingClientRect()
    const offsetX = previewRect.width / 2
    const offsetY = previewRect.height / 2

    preview.style.left = e.pageX - offsetX + "px"
    preview.style.top = e.pageY - offsetY + "px"
}

const moveProjectImg = (project) => {
    const projectId = project.id
    gsap.to(previewImg, 0.4, {
        backgroundPosition: bgPositions[projectId] || "0 0"
    })
}

const isMouseInsideContainer = (e) => {
    const containerRect = projects.getBoundingClientRect()
    return (
        e.pageX >= containerRect.left &&
        e.pageX <= containerRect.right &&
        e.pageY >= containerRect.top &&
        e.pageY <= containerRect.bottom
    )
}

window.addEventListener("mousemove", moveStuff)

Array.from(projects.children).forEach((project) => {
    project.addEventListener("mousemove", moveProject)
    project.addEventListener("mousemove", moveProjectImg.bind(null, project))
})





new kursor({
    type: 4,
    removeDefaultCursor: false,
})




document.addEventListener("DOMContentLoaded", function() {
    let tl = gsap.timeline({ paused: true })

    tl.to(".menu-overlay", {
        duration: 1,
        clipPath: "polygon(0 0 , 100% 0, 100% 100%, 0 100%)",
        ease: "power2.out",
    })

    tl.from(
        ".menu-link, .btn",
        {
            opacity: 0,
            y: 60,
            stagger: 0.05,
            duration: 0.75,
            ease: "power1.inOut",
        },
        "<",
    )

    tl.to(
        ".video-preview",
        {
            duration: 1,
            height: "200px",
            ease: "power2.out",
        },
        "<",
    )

    tl.to(
        ".menu-divider",
        {
            duration: 2,
            width: "100%",
            ease: "power4.out",
        },
        "<",
    )

    function openMenu() {
        document.querySelector(".menu-overlay").style.pointerEvents = "all"
        tl.play()
    }

    function closeMenu() {
        document.querySelector(".menu-overlay").style.pointerEvents = "none"
        tl.reverse()
    }

    document.querySelector(".menu-open-btn").addEventListener("click", openMenu)
    document
        .querySelector(".menu-close-btn")
        .addEventListener("click", closeMenu)
    tl.reverse()
})

function homepageAnimation() {
    gsap.from(".nav-logo, .menu-open-btn", 1, { 
        top: "30px",
        opacity: 0, 
        ease: "power4.inout", 
        delay: 1,
        stagger: {
            amount: 0.3,
        }
    });

    gsap.from("h1", 2, { 
        y: 50,
        opacity: 0, 
        ease: "power4.inout", 
        delay: 1.5,
        stagger: {
            amount: 0.3,
        }
    });

    gsap.from(".play-wrapper, .pattern, .copy", 2, {
        scaleY: 0,
        ease: "power3.inOut",
        stagger: {
            amount: 0.3,
        },
        delay: 2.5,
    })

    gsap.from(".hr", 2, {
        width: "0",
        ease: "power3.inOut",
        delay: 3,
    })

    gsap.from(".btns", 2, {
        x: 50,
        opacity: 0,
        ease: "power3.inOut",
        delay: 3,
    })

    gsap.from(".play-btn", 2, {
        scale: 0,
        ease: "power3.inOut",
        delay: 3,
    })

    gsap.from(".hero-wrapper", 2, {
        width: "100%",
        ease: "power3.inOut",
        delay: 3,
    })

    gsap.from(".arrow", 2, {
        scale: "0",
        ease: "power3.inOut",
        delay: 3,
    })

    gsap.from(".marquee1", 2, {
        bottom: "-50rem",
        ease: "power3.inOut",
        delay: 4,
        opacity: 0,
    })

    gsap.from(".marquee2", 2, {
        bottom: "-50rem",
        ease: "power3.inOut",
        delay: 4,
        opacity: 0,
    })
}
homepageAnimation()




const blocks = document.querySelectorAll(".block")
const resetDuration = 300
blocks.forEach((block) => {
    let timeoutId

    block.addEventListener("mouseover", () => {
        clearTimeout(timeoutId)
        block.classList.add("active")
        timeoutId = setTimeout(() => {
            block.classList.remove("active")
        }, resetDuration)
    })
})


const observer = new IntersectionObserver((enteries) => {
    enteries.forEach((entry) => {
        // console.log(entry);
        if(entry.isIntersecting) {
            entry.target.classList.add('show')
        }
        else {
            entry.target.classList.remove('show')
        }
    })
})

const hiddenElements = document.querySelectorAll(".hidden")
hiddenElements.forEach((el) => observer.observe(el))










const svg = document.querySelector("#svg")
const mouse = svg.createSVGPoint();

const leftEye = createEye("#left-eye");
const rightEye = createEye("#right-eye");

let requestId = null
window.addEventListener("mousemove", onMouseMove)

function onFrame(){
    let point = mouse.matrixTransform(svg.getScreenCTM().inverse());

    leftEye.rotateTo(point);
    rightEye.rotateTo(point)

    requestId = null
}

function onMouseMove(event) {
    mouse.x = event.clientX
    mouse.y = event.clientY

    if(!requestId) {
        requestId = requestAnimationFrame(onFrame)
    }
}

function createEye(selector) {
    const element = document.querySelector(selector)

    TweenMax.set(element, {
        transformOrigin: "center"
    })

    let bbox = element.getBBox()
    let centerX = bbox.x + bbox.width / 2
    let centerY = bbox.x + bbox.height / 2

    function rotateTo(point) {
        let dx = point.x - centerX
        let dy = point.y - centerY

        let angle = Math.atan2(dy, dx)

        TweenMax.to(element, 0.3, {
            rotation: angle + "_rad_short",
        })
    }

    return {
        element,
        rotateTo
    }
}






document.addEventListener("mousemove", parallax)

function parallax(e) {
    this.querySelectorAll(".layer").forEach((layer) => {
        const speed = layer.getAttribute("data-speed")

        const x = (window.innerWidth - e.pageX * speed) / 150
        const y = (window.innerHeight - e.pageY * speed) / 150

        layer.style.transform = `translateX(${x}px) translateY(${y}px)`
    })
}