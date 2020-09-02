interface HydraResource {
  "@context"?: string;
  "@id": string;
  "@type": string;
}
export interface HydraCollection<T = HydraResource> extends HydraResource {
  "hydra:member": T[];
  "hydra:totalItems": number;
}
export interface Brand extends HydraResource {
  /**
   * Brand ID.
   */
  id: number;
  /**
   * Brand name, Ex: Michelin.
   */
  name: string;
  /**
   * Brand logo filename, Ex: 106.jpg.
   */
  logoFilename: string | null;
}
