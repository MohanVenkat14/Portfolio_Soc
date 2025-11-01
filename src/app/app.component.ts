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
  private targetRotationX = 0;
  private targetRotationY = 0;
  
  // API Configuration - Update this for production
  private readonly API_URL = 'http://localhost:3000'; // Change to your Vercel URL in production

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.init3DBackground();
  }

  ngAfterViewInit() {
    // Set up hover effects after view initializes
    setTimeout(() => {
      this.setupHoverEffects();
    }, 500);
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
    this.http.post(`${this.API_URL}/api/contact`, this.contactForm).subscribe({
      next: () => {
        this.submitted = true;
        this.contactForm = { name: '', email: '', message: '' };
        setTimeout(() => this.submitted = false, 3000);
      },
      error: (err) => console.error(err)
    });
  }

  scrollTo(el: string) {
    document.getElementById(el)?.scrollIntoView({ behavior: 'smooth' });
  }
}



