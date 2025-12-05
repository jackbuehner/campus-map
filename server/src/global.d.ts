declare module '@koopjs/koop-core' {
  class Koop {
    /**
     * Registers a plugin with Koop.
     * @param provider
     * @param options
     */
    register(provider: unknown, options?: Record<string, unknown>): void;

    server: import('express').Express & {
      handle(
        req: import('node:http').IncomingMessage,
        res: import('node:http').ServerResponse,
        next?: (err?: any) => void
      ): void;
    };

    [key: string]: unknown;
  }

  export default Koop;
}

declare namespace koop {
  export interface Route {
    path: string;
    methods: unknown[];
    handler: string;
    [key: string]: unknown;
  }
}

declare module '@koopjs/output-geoservices' {
  interface GeoServicesOptions {
    logger?: any;
    authInfo?: {
      isTokenBasedSecurity?: boolean;
    };
    includeOwningSystemUrl?: boolean;
    useHttpForTokenUrl?: boolean;
    defaults?: Record<string, unknown>;
  }

  interface GeoRoute {
    path: string;
    methods: ('get' | 'post')[];
    handler: string;
  }

  interface GeoModel {
    namespace: string;
    pull(req: import('express').Request): Promise<any>;
    authenticate(req: import('express').Request): Promise<any>;
    authenticationSpecification?(): { useHttp?: boolean };
  }

  class GeoServices {
    static type: string;
    static version: string;
    static routes: GeoRoute[];

    constructor(model: GeoModel, options?: GeoServicesOptions);

    invalidUrlHandler(req: import('express').Request, res: import('express').Response): Promise<void>;
    restInfoHandler(req: import('express').Request, res: import('express').Response): void;

    serverInfoHandler(req: import('express').Request, res: import('express').Response): Promise<void>;
    layersInfoHandler(req: import('express').Request, res: import('express').Response): Promise<void>;
    layerInfoHandler(req: import('express').Request, res: import('express').Response): Promise<void>;
    queryHandler(req: import('express').Request, res: import('express').Response): Promise<void>;
    generateRendererHandler(req: import('express').Request, res: import('express').Response): Promise<void>;
    queryRelatedRecordsHandler(
      req: import('express').Request,
      res: import('express').Response
    ): Promise<void>;
    generateToken(req: import('express').Request, res: import('express').Response): Promise<void>;
  }

  export default GeoServices;
}

declare module 'koop-provider-pg' {
  interface PgProvider {
    type: 'provider';
    name: 'pg';
    hosts: boolean;
    disableIdParam: boolean;
    Model: Model;
    version: string;
  }

  class Model {
    constructor();

    getData(
      request: import('express').Request,
      callback: (err?: Error | null, data?: GeoJsonFeatureCollection | null) => void
    ): void;
  }

  interface GeoJsonFeature {
    type: string;
    geometry?: {
      type?: string;
      coordinates?: unknown;
    };
    properties?: Record<string, unknown>;
  }

  interface GeoJsonFeatureCollection {
    type: 'FeatureCollection';
    features: GeoJsonFeature[];
    metadata?: {
      title: string;
      name: string;
      description: string;
      geometryType: string | null;
      idField?: string;
    };
    description?: string;
  }

  const pg: PgProvider;

  export default pg;
}
