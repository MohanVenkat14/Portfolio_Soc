import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';


declare const THREE: any;

interface ContactForm {
  name: string;
  email: string;
  message: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  @ViewChild('canvasContainer', { static: true }) canvasContainer!: ElementRef;

  contactForm: ContactForm = { name: '', email: '', message: '' };
  submitted = false;
  formError = '';
  private targetRotationX = 0;
  private targetRotationY = 0;
  activeSection = 'home';
  typedText = '';
  isTyping = false;
  
  private readonly typingText = 'Computer Science Engineering Student';
  
  // API Configuration - Update this for production
  private readonly API_URL = window.location.origin;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.init3DBackground();
    this.initTypingEffect();
    this.setupScrollListener();
  }

  ngAfterViewInit() {
    // Set up hover effects after view initializes
    setTimeout(() => {
      this.setupHoverEffects();
    }, 500);
  }


  initTypingEffect() {
    let index = 0;
    let isDeleting = false;
    let waitCount = 0;
    
    const typeInterval = setInterval(() => {
      if (!isDeleting && index < this.typingText.length) {
        // Typing
        this.isTyping = true;
        this.typedText = this.typingText.substring(0, index + 1);
        index++;
      } else if (!isDeleting && index >= this.typingText.length) {
        // Finished typing, wait before deleting
        waitCount++;
        if (waitCount >= 20) { // Wait 2 seconds (20 * 100ms)
          isDeleting = true;
          waitCount = 0;
        }
      } else if (isDeleting && index > 0) {
        // Deleting
        index--;
        this.typedText = this.typingText.substring(0, index);
      } else if (isDeleting && index === 0) {
        // Finished deleting, start typing again
        isDeleting = false;
        waitCount = 0;
      }
    }, 100);
  }

  setupScrollListener() {
    const sections = ['home', 'about', 'experience', 'projects', 'skills', 'contact'];
    let lastSection = this.activeSection;
    
    window.addEventListener('scroll', () => {
      const scrollPos = window.scrollY + 100;
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;
          
          if (scrollPos >= offsetTop && scrollPos < offsetBottom) {
            if (lastSection !== section) {
              // Section changed - update active section
              this.activeSection = section;
              lastSection = section;
            }
            break;
          }
        }
      }
    });
  }


  setupHoverEffects() {
    const hoverElements = document.querySelectorAll('.card, .btn, .hero-text, .nav-links a, .project-link, .skill-item, .tech-tag');
    hoverElements.forEach(element => {
      element.addEventListener('mouseenter', () => {
        this.targetRotationX = -0.5;
        this.targetRotationY = 0.5;
      });
      element.addEventListener('mouseleave', () => {
        this.targetRotationX = 0;
        this.targetRotationY = 0;
      });
    });
  }

  init3DBackground() {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    this.canvasContainer.nativeElement.appendChild(renderer.domElement);

    // Create floating particles
    const particles = new THREE.BufferGeometry();
    const count = 1500;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    // Add three color values for gradient effect
    const color1 = new THREE.Color(0x00d4ff); // Cyan
    const color2 = new THREE.Color(0x8b5cf6); // Purple
    const color3 = new THREE.Color(0xec4899); // Pink

    for (let i = 0; i < count * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 250;
      positions[i + 1] = (Math.random() - 0.5) * 250;
      positions[i + 2] = (Math.random() - 0.5) * 250;

      // Assign colors based on position
      const colorChoice = Math.random();
      let color;
      if (colorChoice < 0.33) color = color1;
      else if (colorChoice < 0.66) color = color2;
      else color = color3;

      colors[i] = color.r;
      colors[i + 1] = color.g;
      colors[i + 2] = color.b;
    }

    particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particles.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.8,
      blending: THREE.AdditiveBlending,
      transparent: true,
      opacity: 0.8,
      vertexColors: true
    });

    const points = new THREE.Points(particles, material);
    scene.add(points);

    camera.position.z = 100;

    let mouseX = 0;
    let mouseY = 0;

    // Track mouse movement for interactive 3D effect
    document.addEventListener('mousemove', (event) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = (event.clientY / window.innerHeight) * 2 - 1;
      this.targetRotationY = mouseX * 0.5;
      this.targetRotationX = mouseY * 0.5;
    });

    const self = this;
    function animate() {
      requestAnimationFrame(animate);
      
      // Smooth rotation based on mouse
      points.rotation.x += (self.targetRotationX - points.rotation.x) * 0.05;
      points.rotation.y += (self.targetRotationY - points.rotation.y) * 0.05;
      points.rotation.z += 0.001;
      
      // Animate particles
      const positions = particles.attributes.position;
      for (let i = 1; i < positions.count; i++) {
        let y = positions.getY(i);
        y += Math.sin(i * 0.001 + Date.now() * 0.0001) * 0.1;
        positions.setY(i, y);
      }
      positions.needsUpdate = true;

      renderer.render(scene, camera);
    }

    animate();

    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });
  }

  submitContact() {
    // Validate form
    if (!this.contactForm.name || !this.contactForm.name.trim()) {
      this.formError = 'Please fill in your name';
      return;
    }
    if (!this.contactForm.email || !this.contactForm.email.trim()) {
      this.formError = 'Please fill in your email';
      return;
    }
    if (!this.contactForm.message || !this.contactForm.message.trim()) {
      this.formError = 'Please fill in your message';
      return;
    }
    
    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(this.contactForm.email)) {
      this.formError = 'Please enter a valid email address';
      return;
    }

    // Clear error and show success immediately
    this.formError = '';
    this.submitted = true;
    const formData = { ...this.contactForm };
    this.contactForm = { name: '', email: '', message: '' };
    
    // Submit in background (non-blocking)
    this.http.post(`${this.API_URL}/api/contact`, formData).subscribe({
      next: () => {
        console.log('Message saved successfully');
      },
      error: (err) => {
        console.error('Error saving message:', err);
        // Still show success even if save fails
      }
    });
    
    // Hide success message after 3 seconds
    setTimeout(() => this.submitted = false, 3000);
  }

  downloadResume() {
    // Open Google Drive resume link in new tab
    window.open('https://drive.google.com/file/d/1Zwz7BBBAiw18SqMarWV2AaFI8m_2tP7q/view?usp=drive_link', '_blank');
  }

  scrollTo(el: string) {
    const element = document.getElementById(el);
    if (element) {
      // Scroll to section smoothly
      element.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => {
        this.activeSection = el;
      }, 100);
    }
  }
}



