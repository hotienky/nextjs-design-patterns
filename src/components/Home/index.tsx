import Image from "next/image";
import styles from "@/components/Home/page.module.css";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const designPatterns = [
    { name: "Singleton", description: "Ensures a class has only one instance and provides a global point of access.", route: "" },
    { name: "Factory Method", description: "Defines an interface for creating objects, but lets subclasses alter the type of objects that will be created.", route: "" },
    { name: "Observer", description: "Allows a subject to notify its observers automatically of any state changes, typically used for event handling systems.", route: "/observer" },
    { name: "Strategy", description: "Allows a family of algorithms to be defined and encapsulated within a class, making them interchangeable.", route: "" },
    { name: "Decorator", description: "Allows behavior to be added to an individual object, dynamically, without affecting the behavior of other objects from the same class.", route: "" }
  ];

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Image
          className={styles.logo}
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <h1>Design Pattern Demos</h1>
        <p>Explore and understand various design patterns used in software development. Here are some common design patterns:</p>

        <ol className={styles.patternList}>
          {designPatterns.map((pattern, index) => (
            <li key={index} className={styles.patternItem}>
              <h2>
                <a href={pattern.route}>{pattern.name}</a>
              </h2>
              <p>{pattern.description}</p>
            </li>
          ))}
        </ol>
      </main>
     
    </div>
  );
}