import { Link } from 'react-router-dom';

function Home() {
    return (
        <div className="home-container">
            <div className="hero-section">
                <div className="hero-content">
                    <h1>Wildlife Explorer</h1>
                    <p>Discover amazing wildlife species of India. Learn, explore, and connect with nature's most beautiful creatures in their natural habitats.</p>
                    <Link to="/animals" className="hero-btn">Start Exploring</Link>
                </div>
                <div className="hero-image">
                    <img src="https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&q=80&w=2068&ixlib=rb-4.0.3" alt="Safari Wildlife" />
                </div>
            </div>

            <div className="features-section">
                <div className="feature-card">
                    <div className="feature-icon">🦁</div>
                    <h3>Discover Species</h3>
                    <p>Browse through our extensive collection of animals and learn about their habitats, diet, and unique behaviors.</p>
                </div>
                <div className="feature-card">
                    <div className="feature-icon">🔍</div>
                    <h3>Compare Animals</h3>
                    <p>Compare different species side-by-side to understand their physical characteristics and conservation status.</p>
                </div>
                <div className="feature-card">
                    <div className="feature-icon">❤️</div>
                    <h3>Save Favorites</h3>
                    <p>Create your personal collection of favorite wildlife and access them anytime from your personalized dashboard.</p>
                </div>
            </div>
        </div>
    );
}

export default Home;
