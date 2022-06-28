import { NgModule } from '@angular/core';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { NetworkService } from './services/network.service';



const config: SocketIoConfig = { url: 'http://localhost:3000', options: {} };

@NgModule({
    imports: [
        SocketIoModule.forRoot(config)
    ],
    exports: [
        // SocketIoModule
    ]
})
export class SharedModule {

}