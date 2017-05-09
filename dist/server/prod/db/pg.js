"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var pg = require("pg");
var client;
var pool;
function Init() {
    client = {
        user: 'wymxggcwikpwav',
        database: 'dd0arpc8l5k2be',
        password: '203bccfd54e249de1659cdcb1d99cac0f82a14eb9246b51bbef0c1598c46089d',
        host: 'ec2-54-83-205-71.compute-1.amazonaws.com',
        port: 5432,
        ssl: true,
        max: 10,
        idleTimeoutMillis: 30000,
    };
    pool = new pg.Pool(client);
    console.log('connected to database: ');
    pool.on('error', function (err, client) {
        console.error('idle client error', err.stack);
    });
}
exports.Init = Init;
function query(text, values, callback) {
    console.log('query:', text, values);
    return pool.query(text, values, callback);
}
exports.query = query;
;
function connect(callback) {
    return pool.connect(callback);
}
exports.connect = connect;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRiL3BnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsdUJBQXlCO0FBR3pCLElBQUksTUFBVSxDQUFDO0FBQ2YsSUFBSSxJQUFRLENBQUM7QUFLYjtJQUVFLE1BQU0sR0FBRztRQUNQLElBQUksRUFBRSxnQkFBZ0I7UUFDdEIsUUFBUSxFQUFFLGdCQUFnQjtRQUMxQixRQUFRLEVBQUUsa0VBQWtFO1FBQzVFLElBQUksRUFBRSwwQ0FBMEM7UUFDaEQsSUFBSSxFQUFFLElBQUk7UUFDVixHQUFHLEVBQUUsSUFBSTtRQUNULEdBQUcsRUFBRSxFQUFFO1FBQ1AsaUJBQWlCLEVBQUUsS0FBSztLQUN6QixDQUFDO0lBRUYsSUFBSSxHQUFHLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUkzQixPQUFPLENBQUMsR0FBRyxDQUFDLHlCQUF5QixDQUFDLENBQUM7SUFFdkMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsVUFBVSxHQUFPLEVBQUUsTUFBVTtRQVE5QyxPQUFPLENBQUMsS0FBSyxDQUFDLG1CQUFtQixFQUFFLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNoRCxDQUFDLENBQUMsQ0FBQztBQUVILENBQUM7QUE5QkQsb0JBOEJDO0FBR0QsZUFBdUIsSUFBUSxFQUFFLE1BQVUsRUFBRSxRQUFZO0lBQ3ZELE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQztJQUNwQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0FBQzVDLENBQUM7QUFIRCxzQkFHQztBQUFBLENBQUM7QUFJRixpQkFBeUIsUUFBWTtJQUNuQyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUNoQyxDQUFDO0FBRkQsMEJBRUMiLCJmaWxlIjoiZGIvcGcuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBwZyBmcm9tICdwZyc7XHJcblxyXG5cclxudmFyIGNsaWVudDphbnk7XHJcbnZhciBwb29sOmFueTtcclxuXHJcbi8qKlxyXG4gKiBJbml0IFBHIGRhdGFiYXNlLlxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIEluaXQoKSB7XHJcblxyXG4gIGNsaWVudCA9IHtcclxuICAgIHVzZXI6ICd3eW14Z2djd2lrcHdhdicsIC8vZW52IHZhcjogUEdVU0VSXHJcbiAgICBkYXRhYmFzZTogJ2RkMGFycGM4bDVrMmJlJywgLy9lbnYgdmFyOiBQR0RBVEFCQVNFXHJcbiAgICBwYXNzd29yZDogJzIwM2JjY2ZkNTRlMjQ5ZGUxNjU5Y2RjYjFkOTljYWMwZjgyYTE0ZWI5MjQ2YjUxYmJlZjBjMTU5OGM0NjA4OWQnLCAvL2VudiB2YXI6IFBHUEFTU1dPUkRcclxuICAgIGhvc3Q6ICdlYzItNTQtODMtMjA1LTcxLmNvbXB1dGUtMS5hbWF6b25hd3MuY29tJywgLy8gU2VydmVyIGhvc3RpbmcgdGhlIHBvc3RncmVzIGRhdGFiYXNlXHJcbiAgICBwb3J0OiA1NDMyLCAvL2VudiB2YXI6IFBHUE9SVFxyXG4gICAgc3NsOiB0cnVlLFxyXG4gICAgbWF4OiAxMCwgLy8gbWF4IG51bWJlciBvZiBjbGllbnRzIGluIHRoZSBwb29sXHJcbiAgICBpZGxlVGltZW91dE1pbGxpczogMzAwMDAsIC8vIGhvdyBsb25nIGEgY2xpZW50IGlzIGFsbG93ZWQgdG8gcmVtYWluIGlkbGUgYmVmb3JlIGJlaW5nIGNsb3NlZFxyXG4gIH07IFxyXG5cclxuICBwb29sID0gbmV3IHBnLlBvb2woY2xpZW50KTtcclxuICAvL3RoaXMgaW5pdGlhbGl6ZXMgYSBjb25uZWN0aW9uIHBvb2xcclxuICAvL2l0IHdpbGwga2VlcCBpZGxlIGNvbm5lY3Rpb25zIG9wZW4gZm9yIDMwIHNlY29uZHNcclxuICAvL2FuZCBzZXQgYSBsaW1pdCBvZiBtYXhpbXVtIDEwIGlkbGUgY2xpZW50c1xyXG4gIGNvbnNvbGUubG9nKCdjb25uZWN0ZWQgdG8gZGF0YWJhc2U6ICcpO1xyXG5cclxuICBwb29sLm9uKCdlcnJvcicsIGZ1bmN0aW9uIChlcnI6YW55LCBjbGllbnQ6YW55KSB7XHJcbiAgLy8gaWYgYW4gZXJyb3IgaXMgZW5jb3VudGVyZWQgYnkgYSBjbGllbnQgd2hpbGUgaXQgc2l0cyBpZGxlIGluIHRoZSBwb29sXHJcbiAgLy8gdGhlIHBvb2wgaXRzZWxmIHdpbGwgZW1pdCBhbiBlcnJvciBldmVudCB3aXRoIGJvdGggdGhlIGVycm9yIGFuZFxyXG4gIC8vIHRoZSBjbGllbnQgd2hpY2ggZW1pdHRlZCB0aGUgb3JpZ2luYWwgZXJyb3JcclxuICAvLyB0aGlzIGlzIGEgcmFyZSBvY2N1cnJlbmNlIGJ1dCBjYW4gaGFwcGVuIGlmIHRoZXJlIGlzIGEgbmV0d29yayBwYXJ0aXRpb25cclxuICAvLyBiZXR3ZWVuIHlvdXIgYXBwbGljYXRpb24gYW5kIHRoZSBkYXRhYmFzZSwgdGhlIGRhdGFiYXNlIHJlc3RhcnRzLCBldGMuXHJcbiAgLy8gYW5kIHNvIHlvdSBtaWdodCB3YW50IHRvIGhhbmRsZSBpdCBhbmQgYXQgbGVhc3QgbG9nIGl0IG91dFxyXG4gIC8vIGNvbnNvbGUuZXJyb3IoJ2lkbGUgY2xpZW50IGVycm9yJywgZXJyLm1lc3NhZ2UsIGVyci5zdGFjayk7XHJcbiAgY29uc29sZS5lcnJvcignaWRsZSBjbGllbnQgZXJyb3InLCBlcnIuc3RhY2spO1xyXG59KTtcclxuXHJcbn1cclxuXHJcbi8vZXhwb3J0IHRoZSBxdWVyeSBtZXRob2QgZm9yIHBhc3NpbmcgcXVlcmllcyB0byB0aGUgcG9vbFxyXG5leHBvcnQgZnVuY3Rpb24gcXVlcnkgKHRleHQ6YW55LCB2YWx1ZXM6YW55LCBjYWxsYmFjazphbnkpIHtcclxuICBjb25zb2xlLmxvZygncXVlcnk6JywgdGV4dCwgdmFsdWVzKTtcclxuICByZXR1cm4gcG9vbC5xdWVyeSh0ZXh0LCB2YWx1ZXMsIGNhbGxiYWNrKTtcclxufTtcclxuXHJcbi8vIHRoZSBwb29sIGFsc28gc3VwcG9ydHMgY2hlY2tpbmcgb3V0IGEgY2xpZW50IGZvclxyXG4vLyBtdWx0aXBsZSBvcGVyYXRpb25zLCBzdWNoIGFzIGEgdHJhbnNhY3Rpb25cclxuZXhwb3J0IGZ1bmN0aW9uIGNvbm5lY3QgKGNhbGxiYWNrOmFueSkge1xyXG4gIHJldHVybiBwb29sLmNvbm5lY3QoY2FsbGJhY2spO1xyXG59XHJcblxyXG4iXX0=