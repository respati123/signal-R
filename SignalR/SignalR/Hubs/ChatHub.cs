using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

namespace SignalR.Hubs
{
    public class ChatHub : Hub
    {

        public string GetConnectionId()
        {
            return Context.ConnectionId;
        }

        public override async Task OnConnectedAsync()
        {
            await base.OnConnectedAsync();
            Console.WriteLine("A client connected to ChatHub: " + GetConnectionId());
        }
        public override async Task OnDisconnectedAsync(Exception e)
        {
            await base.OnDisconnectedAsync(e);
            Console.WriteLine("A client disconnected to ChatHub: " + e);
        }

        public async Task Send(string userId)
        {
            var message = $"Send message to you with user id {userId}";
            await Clients.Client(userId).SendAsync("ReceiveMessage", message);
        }
    }
}